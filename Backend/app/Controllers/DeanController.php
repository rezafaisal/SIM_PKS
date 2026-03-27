<?php

namespace App\Controllers;

use App\Models\CooperationDeanModel;
use App\Models\DeanModel;
use App\Models\FacultyModel;
use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\HTTP\ResponseInterface;

class DeanController extends ResourceController
{
    public function index()
    {
        $model = new DeanModel();
        $data = $model->findAll();
        return $this->respond($data, 200);
    }

    public function getAllDean()
    {
        $deanModel = new DeanModel();
        $deans = $deanModel->getAllDean();
        // Memformat data response
        $response = [];
        foreach ($deans as $dean) {
            $periods = explode(', ', $dean->period);
            $response[] = [
                'id' => $dean->id,
                'name' => $dean->name,
                'nip' => $dean->nip,
                'position' => $dean->position,
                'period' => $periods,
                'faculty_id' => $dean->id_faculty,
                'facultys_name' => $dean->facultys_name,
                'status' => $dean->status,
            ];
        }

        // Mengembalikan response
        return $this->respond($response, 200);
    }

    public function createDean()
    {
        // Validasi input
        $rules = [
            'name' => 'required',
            'nip' => 'required',
            'position' => 'required',
            'faculty' => 'required|numeric', // Updated validation for faculty_id
            'period' => 'required'
        ];

        if (!$this->validate($rules)) {
            $validationErrors = implode(', ', $this->validator->getErrors());
            return $this->failValidationErrors($validationErrors);
        }


        // Memperoleh input
        $name = $this->request->getVar('name');
        $nip = $this->request->getVar('nip');
        $position = $this->request->getVar('position');
        $facultyId = $this->request->getVar('faculty'); // Updated faculty_id
        $period = $this->request->getVar('period'); // Updated period
        // Memastikan fakultas dengan ID yang diberikan ada
        $facultyModel = new FacultyModel();
        $faculty = $facultyModel->find($facultyId);
        if (!$faculty) {
            return $this->failNotFound('Faculty not found');
        }

        // Menyimpan data dean
        $deanModel = new DeanModel();
        $periodString = implode(', ', $period);
        $deanData = [
            'name' => $name,
            'nip' => $nip,
            'position' => $position,
            'id_faculty' => $facultyId,
            'status' => 0, // Default status to 0
            'period' => $periodString // Updated period
        ];
        $deanModel->insert($deanData);

        // Menyiapkan respons
        $response = [
            'message' => 'Data Dean Berhasil ditambahkan'
        ];
        return $this->respondCreated($response);
    }

    public function updateDean($id)
    {
        // Validasi input
        $rules = [
            'name' => 'required',
            'nip' => 'required',
            'position' => 'required',
            'faculty' => 'required|numeric', // Updated validation for faculty_id
            'period' => 'required'
        ];

        if (!$this->validate($rules)) {
            $validationErrors = implode(', ', $this->validator->getErrors());
            return $this->failValidationErrors($validationErrors);
        }

        // Memeriksa apakah dean dengan ID yang diberikan ada
        $deanModel = new DeanModel();
        $dean = $deanModel->find($id);
        if (!$dean) {
            return $this->failNotFound('Dean not found');
        }

        // Memeriksa apakah fakultas dengan ID yang diberikan ada
        $facultyId = $this->request->getVar('faculty');
        $facultyModel = new FacultyModel();
        $faculty = $facultyModel->find($facultyId);
        if (!$faculty) {
            return $this->failNotFound('Faculty not found');
        }

        // Memperbarui data dean
        $name = $this->request->getVar('name');
        $nip = $this->request->getVar('nip');
        $position = $this->request->getVar('position');
        $period = $this->request->getVar('period'); // Updated period
        $periodString = implode(', ', $period); // Menggabungkan dua tanggal ke dalam satu string dengan koma sebagai pemisah

        $deanData = [
            'name' => $name,
            'nip' => $nip,
            'position' => $position,
            'id_faculty' => $facultyId,
            'period' => $periodString // Updated period
        ];
        $deanModel->update($id, $deanData);

        // Menyiapkan respons
        $response = [
            'message' => 'Dean data updated successfully'
        ];
        return $this->respondUpdated($response);
    }

    public function deleteDean($id = null)
    {
        $model = new DeanModel();
        $cooperationDeanModel = new CooperationDeanModel();

        // Cek jika masih ada referensi ke AccessPage di access_page_role
        $referensiCount = $cooperationDeanModel->where('dean_id', $id)->countAllResults();
        if ($referensiCount > 0) {
            // Kembalikan pesan kesalahan jika masih ada referensi
            return $this->fail("Tolong hapus data yang berelasi dengan Dekan ini terlebih dahulu.", 400);
        }

        $delete = $model->delete($id);

        if ($delete) {
            return $this->respondDeleted(['message' => 'Dean berhasil dihapus', 'id' => $id]);
        } else {
            return $this->fail('Gagal menghapus Dean', 400);
        }
    }

    public function activateDean($id)
    {
        // Mendapatkan dean yang akan diaktifkan
        $deanModel = new DeanModel();
        $dean = $deanModel->find($id);

        // Memeriksa apakah dean ditemukan
        if (!$dean) {
            return $this->failNotFound('Dean not found');
        }

        // Memeriksa apakah kontak memiliki properti id_faculty
        if (!isset($dean->id_faculty) && !isset($dean['id_faculty'])) {
            return $this->fail('Dean does not have faculty information', 400);
        }

        // Mendapatkan fakultas yang terkait dengan kontak
        $facultyId = $dean['id_faculty'];

        // Menonaktifkan kontak-kontak dengan fakultas yang sama
        $deanModel->where('id !=', $id)
            ->where('id_faculty', $facultyId)
            ->where('status', 1)
            ->set(['status' => 0]) // Set the status field to 0 for matching records
            ->update();

        // Mengaktifkan atau menonaktifkan dean yang dipilih
        $newStatus = $dean['status'] == 1 ? 0 : 1;

        $deanModel->update($id, ['status' => $newStatus]);

        // Menyiapkan respons
        $response = [
            'message' => 'Dean ' . ($newStatus == 1 ? 'activated' : 'deactivated') . ' successfully'
        ];
        return $this->respondUpdated($response);
    }
}
