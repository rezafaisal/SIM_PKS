<?php

namespace App\Controllers;

use App\Models\ContactModel;
use App\Models\CooperationFacultyModel;
use App\Models\DeanModel;
use App\Models\FacultyModel;
use App\Models\ProdiModel;
use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\HTTP\ResponseInterface;

class FacultyController extends ResourceController
{
    public function index()
    {
        $facultyModel = new FacultyModel();
        $faculties = $facultyModel->getAllFaculty();

        // Prepare response data
        $response = [];
        foreach ($faculties as $faculty) {
            $response[] = [
                'id' => $faculty['id'],
                'name' => $faculty['name'],
                'prodi_names' => $faculty['prodi_names']
            ];
        }

        return $this->respond($response, 200);
    }
    public function getFacultyData($id)
    {
        try {
            // Fetch contact data
            $contactModel = new ContactModel();
            $contactData = $contactModel->where('id_faculty', $id)->findAll();

            // Fetch active contact
            $activeContact = null;
            foreach ($contactData as $contact) {
                if ($contact['status'] == 1) {
                    $activeContact = $contact;
                    break;
                }
            }

            // Fetch dean data
            $deanModel = new DeanModel();
            $deanData = $deanModel->where('id_faculty', $id)->findAll();

            // Fetch active dean
            $activeDean = null;
            foreach ($deanData as $dean) {
                if ($dean['status'] == 1) {
                    $activeDean = $dean;
                    break;
                }
            }

            $prodiModel = new ProdiModel();
            $prodiData = $prodiModel->where('id_faculty', $id)->findAll();
            // Prepare additional response data
            $response = [
                'contact' => [
                    'contactActiveId' => $activeContact ? $activeContact["id"] : null,
                    'contactData' => $contactData
                ],
                'dean' => [
                    'deanActiveId' => $activeDean ? $activeDean["id"] : null,
                    'deanData' => $deanData
                ],
                'prodi' => $prodiData
            ];

            return $this->respond($response, 200);
        } catch (\Exception $e) {
            return $this->failServerError($e->getMessage());
        }
    }
    public function createFaculty()
    {
        // Validate input
        $rules = [
            'name' => 'required'
        ];

        if (!$this->validate($rules)) {
            return $this->failValidationErrors($this->validator->getErrors());
        }

        // Extract input
        $name = $this->request->getVar('name');

        // Begin transaction
        $db = db_connect();
        $db->transStart();

        try {
            // Create faculty
            $facultyModel = new FacultyModel();
            $facultyModel->insert(['name' => $name]);

            // Commit transaction
            $db->transCommit();

            return $this->respondCreated(['message' => 'Faculty created successfully']);
        } catch (\Exception $e) {
            // Rollback transaction on error
            $db->transRollback();
            return $this->failServerError($e->getMessage());
        }
    }

    public function updateFaculty($id)
    {
        // Validate input
        $rules = [
            'name' => 'required'
        ];

        if (!$this->validate($rules)) {
            return $this->failValidationErrors($this->validator->getErrors());
        }

        // Extract input
        $name = $this->request->getVar('name');

        // Begin transaction
        $db = db_connect();
        $db->transStart();

        try {
            // Update faculty
            $facultyModel = new FacultyModel();
            $facultyModel->update($id, ['name' => $name]);

            // Commit transaction
            $db->transCommit();

            return $this->respondUpdated(['message' => 'Faculty updated successfully']);
        } catch (\Exception $e) {
            // Rollback transaction on error
            $db->transRollback();
            return $this->failServerError($e->getMessage());
        }
    }

    public function deleteFaculty($id = null)
    {
        // Begin transaction
        $db = db_connect();
        $db->transStart();

        try {

            // Then delete the faculty record
            $facultyModel = new FacultyModel();
            $cooperationFacultyModel = new CooperationFacultyModel();
            $prodiModel = new ProdiModel();
            $contactModel = new ContactModel();
            $deansModel = new DeanModel();
            $referensiCount = $cooperationFacultyModel->where('faculty_id', $id)->countAllResults();
            $referensiProdiCount = $prodiModel->where('id_faculty', $id)->countAllResults();
            $referensiContactCount = $contactModel->where('id_faculty', $id)->countAllResults();
            $referensiDeansCount = $deansModel->where('id_faculty', $id)->countAllResults();
            if (($referensiCount > 0) || ($referensiProdiCount > 0) || ($referensiContactCount > 0) || ($referensiDeansCount > 0)) {
                // Kembalikan pesan kesalahan jika masih ada referensi
                return $this->fail("Tolong hapus data yang berelasi dengan Fakultas ini terlebih dahulu.", 400);
            }

            $facultyModel->delete($id);

            // Commit transaction
            $db->transCommit();

            return $this->respondDeleted(['message' => 'Faculty  deleted successfully']);
        } catch (\Exception $e) {
            // Rollback transaction on error
            $db->transRollback();
            return $this->failServerError($e->getMessage());
        }
    }
}
