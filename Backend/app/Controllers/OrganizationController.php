<?php

namespace App\Controllers;

use App\Models\OrganizationModel;
use CodeIgniter\RESTful\ResourceController;

class OrganizationController extends ResourceController
{

    public function index()
    {
        $organizationModel = new OrganizationModel();
        $response = $organizationModel->getAllOrganization();
        return $this->respond($response, 200);
    }

    public function get()
    {
        $organizationModel = new OrganizationModel();
        $response = $organizationModel->getAllOrganizationsWithLevels();
        return $this->respond($response, 200);
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
        $parentId = $this->request->getVar('id_parent');

        // Create a new ProdiModel instance
        $model = new OrganizationModel();

        // Check if the 'name' already exists
        if ($model->where('name', $name)->first()) {
            return $this->fail('Nama Organisasi sudah ada', 400);
        }

        // Insert the new 'prodi' with the provided 'name' and 'id_faculty'
        $insertedId = $model->insert([
            'name' => $name,
            'id_parent' => $parentId
        ]);

        // Check if the insertion was successful
        if ($insertedId) {
            return $this->respondCreated(['message' => 'Data Organisasi berhasil ditambahkan']);
        } else {
            return $this->fail('Gagal menambahkan data Organisasi', 400);
        }
    }

    public function update($id = null)
    {
        // Ensure 'id' is provided
        if (!$id) {
            return $this->fail('ID Organization tidak valid', 400);
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
        $parentId = $this->request->getVar('id_parent');

        // Create a new OrganizationModel instance
        $model = new OrganizationModel();

        // Check if the organization with the provided 'id' exists
        $existingOrganization = $model->find($id);
        if (!$existingOrganization) {
            return $this->fail('Organisasi tidak ditemukan', 404);
        }

        // Check if a different organization with the same name already exists
        $otherOrganization = $model->where('name', $name)->where('id !=', $id)->first();
        if ($otherOrganization) {
            return $this->fail('Nama Organisasi sudah ada', 400);
        }

        // Update the organization with the provided 'id'
        $updated = $model->update($id, [
            'name' => $name,
            'id_parent' => $parentId
        ]);

        // Check if the update was successful
        if ($updated) {
            return $this->respond(['message' => 'Data Organisasi berhasil diupdate'], 200);
        } else {
            return $this->fail('Gagal mengupdate data Organisasi', 400);
        }
    }


    public function delete($id = null)
    {
        // Ensure 'id' is provided
        if (!$id) {
            return $this->fail('ID Organization tidak valid', 400);
        }

        // Create a new ProdiModel instance
        $model = new OrganizationModel();

        // Check if the 'prodi' with the provided 'id' exists
        $existingProdi = $model->find($id);
        if (!$existingProdi) {
            return $this->fail('Organisasi tidak ditemukan', 404);
        }

        // Delete the 'prodi' with the provided 'id'
        $deleted = $model->delete($id);

        // Check if the deletion was successful
        if ($deleted) {
            return $this->respondDeleted(['message' => 'Data Organisasi berhasil dihapus', 'id' => $id]);
        } else {
            return $this->fail('Gagal menghapus data Organisasi', 400);
        }
    }
}
