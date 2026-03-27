<?php

namespace App\Filters;

use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\Filters\FilterInterface;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class AuthFilter implements FilterInterface
{
    public function before(RequestInterface $request, $arguments = null)
    {
        $token = $request->getHeaderLine('Authorization');

        if (empty($token)) {
            return \Config\Services::response()->setStatusCode(401)->setJSON(['message' => 'Token tidak ada.']);
        }

        $tokenParts = explode(' ', $token);

        if (count($tokenParts) !== 2 || $tokenParts[0] !== 'Bearer') {
            return \Config\Services::response()->setStatusCode(401)->setJSON(['message' => 'Format token tidak valid.']);
        }

        $jwtToken = $tokenParts[1];

        try {
            JWT::decode($jwtToken, new Key(getenv('JWT_SECRET'), 'HS256'));
        } catch (\Exception $e) {
            return \Config\Services::response()->setStatusCode(401)->setJSON(['message' => 'Token tidak valid atau kedaluwarsa.']);
        }
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
        // Tidak perlu perubahan apa pun setelah eksekusi
    }
}
