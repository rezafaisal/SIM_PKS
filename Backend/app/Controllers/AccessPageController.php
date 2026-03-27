<?php

namespace App\Controllers;

use App\Models\RoleAccessModel;
use App\Models\AccessPageModel;
use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\HTTP\ResponseInterface;

class AccessPageController extends ResourceController
{

    public function show($id = null)
    {
        $modelPage = new AccessPageModel();
        $data = [
            'message' => 'success',
            'data_page' => $modelPage->findAll()
        ];
        return $this->respond($data, 200);
    }


    public function create()
    {
        $rules = $this->validate([
            'name' => 'required',
        ]);

        if (!$rules) {
            $response = [
                'message' => $this->validator->getErrors()
            ];
            return $this->failValidationErrors($response);
        }

        $modelPegawai = new AccessPageModel();
        $modelPegawai->insert([
            'name' => esc($this->request->getVar('name')),
        ]);
        $response = [
            'message' => 'Data Access Page Berhasil ditambahkan'
        ];
        return $this->respondCreated($response);
    }

    public function update($id = null)
    {
        $rules = $this->validate([
            'name' => 'required',
        ]);

        if (!$rules) {
            $response = [
                'message' => $this->validator->getErrors()
            ];
            return $this->failValidationErrors($response);
        }

        $modelPegawai = new AccessPageModel();
        $modelPegawai->update($id, [
            'name' => esc($this->request->getVar('name')),
        ]);
        $response = [
            'message' => 'Data Access Page Berhasil diubah'
        ];
        return $this->respond($response, 200);
    }

    public function delete($id = null)
    {
        $model = new AccessPageModel();
        $roleAccessModel = new RoleAccessModel();

        // Cek jika masih ada referensi ke AccessPage di access_page_role
        $referensiCount = $roleAccessModel->where('access_page_id', $id)->countAllResults();
        if ($referensiCount > 0) {
            // Kembalikan pesan kesalahan jika masih ada referensi
            return $this->fail("Tolong hapus data yang berelasi dengan Access Page ini terlebih dahulu.", 400);
        }

        // Jika tidak ada referensi, lanjutkan dengan penghapusan
        $delete = $model->delete($id);

        if ($delete) {
            return $this->respondDeleted(['message' => 'Access Page berhasil dihapus', 'id' => $id]);
        } else {
            return $this->fail('Gagal menghapus Access Page', 400);
        }
    }
}
