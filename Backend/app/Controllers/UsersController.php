<?php

namespace App\Controllers;

use App\Models\ProdiUserModel;
use App\Models\UserModel;
use App\Models\UserRoleModel;
use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\HTTP\ResponseInterface;


class UsersController extends ResourceController
{
    protected $modelName = 'App\Models\UserModel';
    protected $format = 'json';
    /**
     * Return an array of resource objects, themselves in array format
     *
     * @return ResponseInterface
     */


    public function index()
    {
        $model = new UserModel();
        $data = $model->getAllUser();
        return $this->respond($data, 200);
    }

    public function show($id = null)
    {
        $model = new UserModel();
        $data = $model->getRoleById($id);
        if ($data) {
            return $this->respond($data, 200);
        } else {
            return $this->fail('Users tidak ditemukan', 404);
        }
    }

    public function createUser()
    {
        $userModel = new UserModel();
        $userRoleModel = new UserRoleModel();
        $userProdiModel = new ProdiUserModel();

        $data = $this->request->getJSON(true);

        $validation = \Config\Services::validation();
        $validation->setRules([
            'username' => [
                'rules' => 'required|is_unique[users.username]',
                'errors' => [
                    'required' => 'Username is required.',
                    'is_unique' => 'Username already exists.'
                ]
            ],
            'password' => 'required',
        ]);

        if (!$validation->run($data)) {
            return $this->fail($validation->getErrors(), 400);
        }

        // Hash the password using the same method as login
        $hashedPassword = password_hash("hashfront_" . $data['password'] . "hashback_kerjasamaulm", PASSWORD_DEFAULT);

        $userData = [
            'username' => $data['username'],
            'password' => $hashedPassword  // Use the hashed password
        ];

        $userId = $userModel->insert($userData);
        if ($userId) {
            if (isset($data['role']) && is_array($data['role'])) { // Menggunakan array notation untuk mengakses properti dalam objek
                foreach ($data['role'] as $roleId) {
                    $userRoleData = [
                        'user_id' => $userId,
                        'role_id' => $roleId
                    ];
                    $userRoleModel->insert($userRoleData);
                }
            }

            if (isset($data['prodi']) && !empty($data['prodi'])) {
                $userProdiData = [
                    'user_id' => $userId,
                    'prodi_id' => $data['prodi']
                ];
                $userProdiModel->insert($userProdiData);
            }


            // return $this->respondCreated(['user_id' => $userId], 'User created successfully.');
            return $this->respondCreated(['message' => 'User berhasil ditambahkan', 'user_id' => $userId], 201);
        } else {
            return $this->fail('Failed to create user.', 500);
        }
    }

    public function updateUser($id = null)
    {

        $userModel = new UserModel();
        $userRoleModel = new UserRoleModel();
        $prodiUserModel = new ProdiUserModel();


        $data = $this->request->getJSON(true);

        $validation = \Config\Services::validation();
        $validation->setRules([
            'username' => 'required',
            // [
            //     'rules' => 'required|is_unique[users.username,id,{id}]',
            //     'errors' => [
            //         'required' => 'Username is required.',
            //         'is_unique' => 'Username already exists.'
            //     ]
            // ]
            // 'password' => 'required',
        ]);

        if (!$validation->run($data)) {
            return $this->fail($validation->getErrors(), 400);
        }

        $user = $userModel->find($id);
        if (!$user) {
            return $this->fail('User not found.', 404);
        }

        $userData = [
            'username' => $data['username'],
            // 'password' => password_hash($data['password'], PASSWORD_DEFAULT)
        ];

        if ($userModel->update($id, $userData)) {
            $userRoleModel->where('user_id', $id)->delete();

            if (isset($data['role']) && is_array($data['role'])) {
                foreach ($data['role'] as $roleId) {
                    $userRoleData = [
                        'user_id' => $id,
                        'role_id' => $roleId
                    ];
                    $userRoleModel->insert($userRoleData);
                }
            }

            if (isset($data['prodi']) && !empty($data['prodi'])) {
                // Check if a prodi_user relationship already exists for this user


                $existingProdi = $prodiUserModel->where('user_id', $id)->first();

                if ($existingProdi) {
                    // Update the existing relationship if it exists

                    $prodiUserModel->where('user_id', $id)->delete();
                    $prodiUserModel->insert(['user_id' => $id, 'prodi_id' => $data['prodi']]);
                } else {
                    // Create a new relationship if none exists
                    $prodiUserModel->insert(['user_id' => $id, 'prodi_id' => $data['prodi']]);
                }
            } else {
                // If prodi_id is empty, delete the existing prodi_user relationship
                $prodiUserModel->where('user_id', $id)->delete();
            }

            // return $this->respondUpdated(['user_id' => $id], 'User updated successfully.');
            return $this->respondCreated(['message' => 'User berhasil diperbarui', 'user_id' => $id], 201);
        } else {
            return $this->fail('Failed to update user.', 500);
        }
    }

    public function deleteUser($id = null)
    {
        $userModel = new UserModel();
        $userRoleModel = new UserRoleModel();
        $prodiUserModel = new ProdiUserModel();

        // Check if the user exists
        $user = $userModel->find($id);
        if (!$user) {
            return $this->fail('User not found.', 404);
        }

        // Delete user roles with a condition (to make sure it only deletes roles for the specific user)
        $userRoleModel->where('user_id', $id)->delete();

        $prodiUserModel->where('user_id', $id)->delete();

        // Ensure the user delete operation includes a "WHERE" clause based on the primary key
        if ($userModel->where('id', $id)->delete()) {
            return $this->respondDeleted(['message' => 'User berhasil dihapus', 'user_id' => $id]);
        } else {
            return $this->fail('Failed to delete user.', 500);
        }
    }
}
