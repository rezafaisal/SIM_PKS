<?php

namespace App\Controllers;

use App\Models\ImplementationModel;
use App\Models\TypeModel;
use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\HTTP\ResponseInterface;

class TypeController extends ResourceController
{

    public function index()
    {
        $prodiModel = new TypeModel();
        $prodis = $prodiModel->findAll();
        return $this->respond($prodis, 200);
    }

    public function create()
    {
        // Validation rules
        $rules = [
            'name' => 'required',
        ];

        // Validate the request data
        if (!$this->validate($rules)) {
            return $this->failValidationErrors($this->validator->getErrors());
        }

        // Extract input
        $name = $this->request->getVar('name');

        // Create a new ProdiModel instance
        $model = new TypeModel();

        // Check if the 'name' already exists
        if ($model->where('name', $name)->first()) {
            return $this->fail('Nama Type sudah ada', 400);
        }

        // Insert the new 'prodi' with the provided 'name' and 'id_faculty'
        $insertedId = $model->insert([
            'name' => $name,
        ]);

        // Check if the insertion was successful
        if ($insertedId) {
            return $this->respondCreated(['message' => 'Data Type berhasil ditambahkan']);
        } else {
            return $this->fail('Gagal menambahkan data Type', 400);
        }
    }

    public function update($id = null)
    {
        // Ensure 'id' is provided
        if (!$id) {
            return $this->fail('ID Type tidak valid', 400);
        }

        // Validation rules
        $rules = [
            'name' => 'required',
        ];

        // Validate the request data
        if (!$this->validate($rules)) {
            return $this->failValidationErrors($this->validator->getErrors());
        }

        // Extract input
        $name = $this->request->getVar('name');

        // Create a new ProdiModel instance
        $model = new TypeModel();

        // Check if the 'prodi' with the provided 'id' exists
        $existingProdi = $model->find($id);
        if (!$existingProdi) {
            return $this->fail('Type tidak ditemukan', 404);
        }

        // Update the 'prodi' with the provided 'id'
        $updated = $model->update($id, [
            'name' => $name,
        ]);

        // Check if the update was successful
        if ($updated) {
            return $this->respond(['message' => 'Data Type berhasil diupdate'], 200);
        } else {
            return $this->fail('Gagal mengupdate data Type', 400);
        }
    }

    public function delete($id = null)
    {
        // Ensure 'id' is provided
        if (!$id) {
            return $this->fail('ID Type tidak valid', 400);
        }

        // Create a new ProdiModel instance
        $model = new TypeModel();

        // Check if the 'prodi' with the provided 'id' exists
        $existingProdi = $model->find($id);
        if (!$existingProdi) {
            return $this->fail('Type tidak ditemukan', 404);
        }
        $implementationModel = new ImplementationModel();
        $referensiCount = $implementationModel->where('id_type', $id)->countAllResults();
        if ($referensiCount > 0) {
            // Kembalikan pesan kesalahan jika masih ada referensi
            return $this->fail("Tolong hapus data yang berelasi dengan Jenis ini terlebih dahulu.", 400);
        }

        // Delete the 'prodi' with the provided 'id'
        $deleted = $model->delete($id);

        // Check if the deletion was successful
        if ($deleted) {
            return $this->respondDeleted(['message' => 'Data Type berhasil dihapus', 'id' => $id]);
        } else {
            return $this->fail('Gagal menghapus data Type', 400);
        }
    }
}
