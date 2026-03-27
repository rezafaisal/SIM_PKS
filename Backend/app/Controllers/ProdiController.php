<?php

namespace App\Controllers;

use App\Models\FacultyModel;
use App\Models\RoleAccessModel;
use App\Models\ProdiModel;
use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\HTTP\ResponseInterface;

class ProdiController extends ResourceController
{

    public function index()
    {
        $prodiModel = new ProdiModel();
        $prodis = $prodiModel->findAll();

        // Prepare response data
        $response = [];
        foreach ($prodis as $prodi) {
            $facultyModel = new FacultyModel();
            $faculty = $facultyModel->find($prodi['id_faculty']);

            $response[] = [
                'id' => $prodi['id'],
                'name' => $prodi['name'],
                'faculty' => [
                    'id' => $faculty['id'],
                    'name' => $faculty['name']
                ]
            ];
        }

        return $this->respond($response, 200);
    }

    public function create()
    {
        // Validation rules
        $rules = [
            'name' => 'required',
            'id_faculty' => 'required'
        ];

        // Validate the request data
        if (!$this->validate($rules)) {
            return $this->failValidationErrors($this->validator->getErrors());
        }

        // Extract input
        $name = $this->request->getVar('name');
        $facultyId = $this->request->getVar('id_faculty');

        // Create a new ProdiModel instance
        $model = new ProdiModel();

        // Check if the 'name' already exists
        if ($model->where('name', $name)->first()) {
            return $this->fail('Nama Prodi sudah ada', 400);
        }

        // Insert the new 'prodi' with the provided 'name' and 'id_faculty'
        $insertedId = $model->insert([
            'name' => $name,
            'id_faculty' => $facultyId
        ]);

        // Check if the insertion was successful
        if ($insertedId) {
            return $this->respondCreated(['message' => 'Data Prodi berhasil ditambahkan']);
        } else {
            return $this->fail('Gagal menambahkan data Prodi', 400);
        }
    }

    public function update($id = null)
    {
        // Ensure 'id' is provided
        if (!$id) {
            return $this->fail('ID Prodi tidak valid', 400);
        }

        // Validation rules
        $rules = [
            'name' => 'required',
            'id_faculty' => 'required'
        ];

        // Validate the request data
        if (!$this->validate($rules)) {
            return $this->failValidationErrors($this->validator->getErrors());
        }

        // Extract input
        $name = $this->request->getVar('name');
        $facultyId = $this->request->getVar('id_faculty');

        // Create a new ProdiModel instance
        $model = new ProdiModel();

        // Check if the 'prodi' with the provided 'id' exists
        $existingProdi = $model->find($id);
        if (!$existingProdi) {
            return $this->fail('Prodi tidak ditemukan', 404);
        }

        // Update the 'prodi' with the provided 'id'
        $updated = $model->update($id, [
            'name' => $name,
            'id_faculty' => $facultyId
        ]);

        // Check if the update was successful
        if ($updated) {
            return $this->respond(['message' => 'Data Prodi berhasil diupdate'], 200);
        } else {
            return $this->fail('Gagal mengupdate data Prodi', 400);
        }
    }

    public function delete($id = null)
    {
        // Ensure 'id' is provided
        if (!$id) {
            return $this->fail('ID Prodi tidak valid', 400);
        }

        // Create a new ProdiModel instance
        $model = new ProdiModel();

        // Check if the 'prodi' with the provided 'id' exists
        $existingProdi = $model->find($id);
        if (!$existingProdi) {
            return $this->fail('Prodi tidak ditemukan', 404);
        }

        // Delete the 'prodi' with the provided 'id'
        $deleted = $model->delete($id);

        // Check if the deletion was successful
        if ($deleted) {
            return $this->respondDeleted(['message' => 'Data Prodi berhasil dihapus', 'id' => $id]);
        } else {
            return $this->fail('Gagal menghapus data Prodi', 400);
        }
    }
}
