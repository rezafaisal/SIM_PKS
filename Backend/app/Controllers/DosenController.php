<?php

namespace App\Controllers;

use App\Models\DosenModel;
use CodeIgniter\RESTful\ResourceController;

class DosenController extends ResourceController
{

    public function index()
    {
        $dosenModel = new DosenModel();
        $response = $dosenModel->getDosenWithOrganization();
        return $this->respond($response, 200);
    }

    public function create()
    {
        // Validation rules
        $rules = [
            'name' => 'required',
            'id_organization' => 'required',
            'nip' => 'required',
        ];

        // Validate the request data
        if (!$this->validate($rules)) {
            return $this->failValidationErrors($this->validator->getErrors());
        }

        // Extract input
        $name = $this->request->getVar('name');
        $organizationId = $this->request->getVar('id_organization');
        $nip = $this->request->getVar('nip');
        $address = $this->request->getVar('address');
        $contact = $this->request->getVar('contact');

        // Create a new ProdiModel instance
        $model = new DosenModel();

        // Check if the 'name' already exists
        if ($model->where('nip', $nip)->first()) {
            return $this->fail('NIP Dosen sudah digunakan', 400);
        }

        // Insert the new 'prodi' with the provided 'name' and 'id_faculty'
        $insertedId = $model->insert([
            'name' => $name,
            'id_organization' => $organizationId,
            'nip' => $nip,
            'address' => $address,
            'contact' => $contact
        ]);

        // Check if the insertion was successful
        if ($insertedId) {
            return $this->respondCreated(['message' => 'Data Dosen berhasil ditambahkan']);
        } else {
            return $this->fail('Gagal menambahkan data Dosen', 400);
        }
    }

    public function update($id = null)
    {
        // Ensure 'id' is provided
        if (!$id) {
            return $this->fail('ID Dosen tidak valid', 400);
        }

        // Validation rules
        $rules = [
            'name' => 'required',
            'id_organization' => 'required',
            'nip' => 'required',
        ];

        // Validate the request data
        if (!$this->validate($rules)) {
            return $this->failValidationErrors($this->validator->getErrors());
        }

        // Extract input
        $name = $this->request->getVar('name');
        $organizationId = $this->request->getVar('id_organization');
        $nip = $this->request->getVar('nip');
        $address = $this->request->getVar('address');
        $contact = $this->request->getVar('contact');

        // Create a new DosenModel instance
        $model = new DosenModel();

        // Check if the dosen with the provided 'id' exists
        $existingDosen = $model->find($id);
        if (!$existingDosen) {
            return $this->fail('Dosen tidak ditemukan', 404);
        }

        // Check if a different dosen with the same name already exists
        $otherDosen = $model->where('nip', $nip)->where('id !=', $id)->first();
        if ($otherDosen) {
            return $this->fail('NIP Dosen sudah digunakan', 400);
        }

        // Update the dosen with the provided 'id'
        $updated = $model->update($id, [
            'name' => $name,
            'id_organization' => $organizationId,
            'nip' => $nip,
            'address' => $address,
            'contact' => $contact
        ]);

        // Check if the update was successful
        if ($updated) {
            return $this->respond(['message' => 'Data Dosen berhasil diupdate'], 200);
        } else {
            return $this->fail('Gagal mengupdate data Dosen', 400);
        }
    }


    public function delete($id = null)
    {
        // Ensure 'id' is provided
        if (!$id) {
            return $this->fail('ID Dosen tidak valid', 400);
        }

        // Create a new ProdiModel instance
        $model = new DosenModel();

        // Check if the 'prodi' with the provided 'id' exists
        $existingProdi = $model->find($id);
        if (!$existingProdi) {
            return $this->fail('Dosen tidak ditemukan', 404);
        }

        // Delete the 'prodi' with the provided 'id'
        $deleted = $model->delete($id);

        // Check if the deletion was successful
        if ($deleted) {
            return $this->respondDeleted(['message' => 'Data Dosen berhasil dihapus', 'id' => $id]);
        } else {
            return $this->fail('Gagal menghapus data Dosen', 400);
        }
    }
}
