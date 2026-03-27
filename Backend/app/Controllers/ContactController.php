<?php

namespace App\Controllers;

use App\Models\ContactModel;
use App\Models\CooperationContactModel;
use App\Models\FacultyModel;
use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\HTTP\ResponseInterface;

class ContactController extends ResourceController
{
    /**
     * Return an array of resource objects, themselves in array format
     *
     * @return ResponseInterface
     */
    public function index()
    {
        $model = new ContactModel();
        $data = $model->findAll();
        return $this->respond($data, 200);
    }
    public function getAllContact()
    {
        $contactModel = new ContactModel();
        $contacts = $contactModel->getAllContact();

        // Memformat data response
        $response = [];
        foreach ($contacts as $contact) {
            $response[] = [
                'id' => $contact->id,
                'name' => $contact->name,
                'nip' => $contact->nip,
                'position' => $contact->position,
                'address' => $contact->address,
                'handphone_no' => $contact->handphone_no,
                'email' => $contact->email,
                'faculty_id' => $contact->id_faculty,
                'facultys_name' => $contact->facultys_name,
                'status' => $contact->status,
            ];
        }

        // Mengembalikan response
        return $this->respond($response, 200);
    }

    public function createContact()
    {
        // Validasi input
        $rules = [
            'name' => 'required',
            'nip' => 'required',
            'position' => 'required',
            'address' => 'required',
            'handphoneNo' => 'required',
            'email' => 'required|valid_email',
            'faculty' => 'required|numeric' // Updated validation for faculty_id
        ];

        if (!$this->validate($rules)) {
            $validationErrors = implode(', ', $this->validator->getErrors());
            return $this->failValidationErrors($validationErrors);
        }

        // Memperoleh input
        $name = $this->request->getVar('name');
        $nip = $this->request->getVar('nip');
        $position = $this->request->getVar('position');
        $address = $this->request->getVar('address');
        $handphoneNo = $this->request->getVar('handphoneNo');
        $email = $this->request->getVar('email');
        $facultyId = $this->request->getVar('faculty'); // Updated faculty_id

        // Memastikan fakultas dengan ID yang diberikan ada
        $facultyModel = new FacultyModel();
        $faculty = $facultyModel->find($facultyId);
        if (!$faculty) {
            return $this->failNotFound('Faculty not found');
        }

        // Menyimpan data kontak
        $contactModel = new ContactModel();
        $contactData = [
            'name' => $name,
            'nip' => $nip,
            'position' => $position,
            'address' => $address,
            'handphone_no' => $handphoneNo,
            'email' => $email,
            'id_faculty' => $facultyId, // Updated id_faculty field
            'status' => 0 // Default status to 0
        ];
        $contactModel->insert($contactData);

        // Menyiapkan respons
        $response = [
            'message' => 'Data Contact Berhasil ditambahkan'
        ];
        return $this->respondCreated($response);
    }

    public function updateContact($id)
    {
        // Validasi input
        $rules = [
            'name' => 'required',
            'nip' => 'required',
            'position' => 'required',
            'address' => 'required',
            'handphoneNo' => 'required',
            'email' => 'required|valid_email',
            'faculty' => 'required|numeric' // Updated validation for faculty_id
        ];

        if (!$this->validate($rules)) {
            $validationErrors = implode(', ', $this->validator->getErrors());
            return $this->failValidationErrors($validationErrors);
        }

        // Memeriksa apakah kontak dengan ID yang diberikan ada
        $contactModel = new ContactModel();
        $contact = $contactModel->find($id);
        if (!$contact) {
            return $this->failNotFound('Contact not found');
        }

        // Memeriksa apakah fakultas dengan ID yang diberikan ada
        $facultyId = $this->request->getVar('faculty');
        $facultyModel = new FacultyModel();
        $faculty = $facultyModel->find($facultyId);
        if (!$faculty) {
            return $this->failNotFound('Faculty not found');
        }

        // Memperbarui data kontak
        $name = $this->request->getVar('name');
        $nip = $this->request->getVar('nip');
        $position = $this->request->getVar('position');
        $address = $this->request->getVar('address');
        $handphoneNo = $this->request->getVar('handphoneNo');
        $email = $this->request->getVar('email');

        $contactData = [
            'name' => $name,
            'nip' => $nip,
            'position' => $position,
            'address' => $address,
            'handphone_no' => $handphoneNo,
            'email' => $email,
            'id_faculty' => $facultyId // Updated id_faculty field
        ];
        $contactModel->update($id, $contactData);

        // Menyiapkan respons
        $response = [
            'message' => 'Contact data updated successfully'
        ];
        return $this->respondUpdated($response);
    }

    public function deleteContact($id = null)
    {
        $model = new ContactModel();
        $cooperationContactModel = new CooperationContactModel();
        $referensiCount = $cooperationContactModel->where('contact_id', $id)->countAllResults();
        if ($referensiCount > 0) {
            // Kembalikan pesan kesalahan jika masih ada referensi
            return $this->fail("Tolong hapus data yang berelasi dengan Kontak ini terlebih dahulu.", 400);
        }
        $delete = $model->delete($id);

        if ($delete) {
            return $this->respondDeleted(['message' => 'Contact berhasil dihapus', 'id' => $id]);
        } else {
            return $this->fail('Gagal menghapus Contact', 400);
        }
    }

    public function activateContact($id)
    {
        // Mendapatkan kontak yang akan diaktifkan
        $contactModel = new ContactModel();
        $contact = $contactModel->find($id);

        // Memeriksa apakah kontak ditemukan
        if (!$contact) {
            return $this->failNotFound('Contact not found');
        }

        // Memeriksa apakah kontak memiliki properti id_faculty
        if (!isset($contact->id_faculty) && !isset($contact['id_faculty'])) {
            return $this->fail('Contact does not have faculty information', 400);
        }

        // Mendapatkan fakultas yang terkait dengan kontak
        $facultyId = $contact['id_faculty'];

        // Menonaktifkan kontak-kontak dengan fakultas yang sama
        $contactModel->where('id !=', $id)
            ->where('id_faculty', $facultyId)
            ->where('status', 1)
            ->set(['status' => 0]) // Set the status field to 0 for matching records
            ->update();

        // Mengaktifkan atau menonaktifkan kontak yang dipilih
        $newStatus = $contact['status'] == 1 ? 0 : 1;

        $contactModel->update($id, ['status' => $newStatus]);

        // Menyiapkan respons
        $response = [
            'message' => 'Contact ' . ($newStatus == 1 ? 'activated' : 'deactivated') . ' successfully'
        ];
        return $this->respondUpdated($response);
    }
}
