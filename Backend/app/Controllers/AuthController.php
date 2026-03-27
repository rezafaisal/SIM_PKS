<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\HTTP\ResponseInterface;
use App\Models\UserModel;
use App\Models\UserRoleModel;
use \Firebase\JWT\JWT;
use Firebase\JWT\Key;


class AuthController extends ResourceController
{
    /**
     * Return an array of resource objects, themselves in array format
     *
     * @return ResponseInterface
     */

    public function login()
    {
        $data = $this->request->getJSON();
        $rules = [
            'username' => 'required',
            'password' => 'required'
        ];

        // Validasi input
        if (!$this->validate($rules)) {
            $validationErrors = implode(', ', \Config\Services::validation()->getErrors());
            return $this->fail($validationErrors, 422);
        }

        // Cari pengguna berdasarkan nama pengguna (username)
        $M_user = new UserModel();
        $user = $M_user->where('username', $data->username)->first();

        // Periksa apakah pengguna ditemukan
        if (!$user) {
            return $this->failNotFound('Username atau Password salah');
        }

        // Periksa apakah password ada dalam data pengguna
        if (!array_key_exists('password', $user)) {
            return $this->failServerError('Invalid user data');
        }

        // Verifikasi password
        $verify_pass = password_verify("hashfront_" . $data->password . "hashback_kerjasamaulm", $user['password']);
        // Jika verifikasi gagal, kembalikan respon dengan kode 403
        if (!$verify_pass) {
            return $this->fail('Username atau Password salah', 403);
        }

        // Buat JWT token
        $key = getenv('JWT_SECRET');
        $iat = time(); // Waktu saat ini
        $exp = $iat + (60 * 60 * 24); // 1 hari dari sekarang

        $payload = [
            "iss" => "Kerjasama ULM Backend",
            "aud" => "Kerjasama ULM",
            "sub" => "JWT Kerjasama ULM",
            "iat" => $iat,
            "exp" => $exp,
            "username" => $user['username'],
            "id_user" => $user['id']
        ];

        // Encode token
        $token = JWT::encode($payload, $key, 'HS256');
        // $userRoleModel = new UserRoleModel();
        // $userRoles = $userRoleModel->where('user_id', $user['id'])->findAll();
        $db = \Config\Database::connect();
        $query = $db->table('users')
            ->select('users.username, access_pages.name as access_page_name, prodi.name as prodi_name, prodi.id as prodi_id')
            ->join('user_role', 'users.id = user_role.user_id', 'inner')
            ->join('access_page_role', 'user_role.role_id = access_page_role.role_id', 'inner')
            ->join('access_pages', 'access_page_role.access_page_id = access_pages.id', 'inner')
            ->join('prodi_user', 'users.id = prodi_user.user_id', 'left') // Use LEFT JOIN to include users with no prodi
            ->join('prodi', 'prodi_user.prodi_id = prodi.id', 'left')
            ->where('users.id', $user['id'])
            ->get()->getResult();

        $accessPageNames = [];
        $prodiName = [
            'name' => 'Admin',
            'id' => null
        ];
        if ($query) {
            $accessPageNames = array_values(array_unique(array_map(fn($page) => $page->access_page_name, $query)));

            foreach ($query as $row) {
                if (!empty($row->prodi_name)) {
                    $prodiName =
                        [
                            'name' => $row->prodi_name,
                            'id' => $row->prodi_id
                        ];
                    break;
                }
            }
        }

        // Respon berhasil
        $response = [
            'creds' => [
                'username' => $data->username,
                'password' => $data->password,
                'access_page' => $accessPageNames,
                'level' => $prodiName
            ],
            'token' => $token,

        ];

        return $this->respond($response, 200);
    }

    public function me()
    {
        // Ambil token dari header Authorization
        $token = $this->request->getHeaderLine('Authorization');

        // Periksa apakah token disediakan
        if (empty($token)) {
            return $this->failUnauthorized('Token tidak ada.');
        }

        // Pisahkan token dari header Authorization
        $tokenParts = explode(' ', $token);

        // Periksa format token
        if (count($tokenParts) !== 2 || $tokenParts[0] !== 'Bearer') {
            return $this->failUnauthorized('Format token tidak valid.');
        }

        $jwtToken = $tokenParts[1];

        try {
            // Decode token
            $decoded = JWT::decode($jwtToken, new Key(getenv('JWT_SECRET'), 'HS256'));

            $db = \Config\Database::connect();
            // $query = $db->table('users')
            //     ->select('users.username, access_pages.name as access_page_name')
            //     ->join('user_role', 'users.id = user_role.user_id', 'inner')
            //     ->join('access_page_role', 'user_role.role_id = access_page_role.role_id', 'inner')
            //     ->join('access_pages', 'access_page_role.access_page_id = access_pages.id', 'inner')
            //     ->where('users.id', $decoded->id_user)
            //     ->get()->getResult();

            $query = $db->table('users')
                ->select('users.username, access_pages.name as access_page_name, prodi.name as prodi_name, prodi.id as prodi_id')
                ->join('user_role', 'users.id = user_role.user_id', 'inner')
                ->join('access_page_role', 'user_role.role_id = access_page_role.role_id', 'inner')
                ->join('access_pages', 'access_page_role.access_page_id = access_pages.id', 'inner')
                ->join('prodi_user', 'users.id = prodi_user.user_id', 'left') // Use LEFT JOIN to include users with no prodi
                ->join('prodi', 'prodi_user.prodi_id = prodi.id', 'left')
                ->where('users.id', $decoded->id_user)
                ->get()->getResult();

            $accessPageNames = [];
            $prodiName = [
                'name' => 'Admin',
                'id' => null
            ];
            if ($query) {
                $accessPageNames = array_values(array_unique(array_map(fn($page) => $page->access_page_name, $query)));

                foreach ($query as $row) {
                    if (!empty($row->prodi_name)) {
                        $prodiName =
                            [
                                'name' => $row->prodi_name,
                                'id' => $row->prodi_id
                            ];
                        break;
                    }
                }
            }

            // Token valid, kembalikan informasi pengguna
            return $this->respond(['creds' => [
                'id' => $decoded->id_user,
                'username' => $decoded->username,
                'access_page' => $accessPageNames,
                'level' => $prodiName
            ]]);
        } catch (\Exception $e) {
            // Token tidak valid atau kedaluwarsa
            return $this->failUnauthorized('Token tidak valid atau kedaluwarsa.');
        }
    }
}
