<?php

namespace App\Controllers;

use App\Models\FacultyModel;
use App\Models\ImplementationModel;
use App\Models\ProdiModel;
use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\HTTP\ResponseInterface;
use DateTime;

class ImplementationController extends ResourceController
{

    public function getImplementation()
    {
        $implementationModel = new ImplementationModel();
        $implementation = $implementationModel->getAll();



        return $this->respond($implementation, 200);
    }

    public function getProdiImplementation($prodiId)
    {
        $implementationModel = new ImplementationModel();
        $implementation = $implementationModel->getByProdi($prodiId);
        return $this->respond($implementation, 200);
    }

    public function createImplementation($cooperationId)
    {
        // Validation rules
        $rules = [
            'name' => 'required',
            'attachment' => 'required',
            'createdDate' => 'required',
            'prodi' => 'required'
        ];

        $createdDate = $this->request->getVar('createdDate');
        if ($createdDate) {
            // Convert string to DateTime object
            $createdDate = (new DateTime($createdDate))->format('Y-m-d');
        } else {
            $createdDate = null; // Handle null dates
        }

        // Check if a file is uploaded before adding file-related validation rules
        if ($this->request->getFile('attachment_file')) {
            $rules['attachment_file'] = 'uploaded[attachment_file]|max_size[attachment_file,5000]';
        }

        if (!$this->validate($rules)) {
            return $this->failValidationErrors($this->validator->getErrors());
        }

        // Handle file upload if a file is uploaded
        $newName = null; // Default to null if no file uploaded
        $file = $this->request->getFile('attachment_file');
        if ($file && $file->isValid() && !$file->hasMoved()) {
            $newName = $file->getRandomName();
            $file->move('uploads', $newName);
        }

        // Insert implementation data
        $implementationModel = new ImplementationModel();
        $data = [
            'id_cooperation' => $cooperationId,
            'id_prodi' => $this->request->getVar('prodi'),
            'created_at' => $createdDate,
            'name' => $this->request->getVar('name'),
            'attachment' => $this->request->getVar('attachment'),
            'attachment_file' => $newName // Save the filename or null if no file uploaded
        ];

        $implementationModel->insert($data);

        // Return success response
        return $this->respondCreated(['message' => 'Implementation created successfully']);
    }

    public function deleteImplementation($id)
    {
        // Check if the implementation exists
        $implementationModel = new ImplementationModel();
        $implementation = $implementationModel->find($id);
        if (!$implementation) {
            return $this->failNotFound('Implementation not found');
        }

        // Delete the file from the uploads directory if it exists
        if (!empty($implementation['attachment_file'])) {
            $filePath = 'uploads/' . $implementation['attachment_file'];
            if (file_exists($filePath)) {
                unlink($filePath); // Delete the file
            }
        }

        // Delete the implementation from the database
        $implementationModel->delete($id);

        // Return success response
        return $this->respondDeleted(['message' => 'Implementation deleted successfully']);
    }

    public function graphImplementationMonth()
    {

        $yearInput = $this->request->getVar('year');
        $facultyInput = $this->request->getVar('faculty');
        $prodiInput = $this->request->getVar('prodi');


        $implementationModel = new ImplementationModel();
        $facultyModel = new FacultyModel();
        $prodiModel = new ProdiModel();

        $monthlyData = [];
        for ($i = 1; $i <= 12; $i++) {
            $monthlyData[$i] = 0; // Inisiasi setiap bulan dengan 0
        }

        if ($prodiInput != -1) {
            $implementations = $implementationModel->where("YEAR(created_at)", $yearInput)->where("id_prodi", $prodiInput)->findAll();

            foreach ($implementations as $implementation) {
                // Ambil bulan dari created_at
                $month = date("n", strtotime($implementation["created_at"]));

                if (array_key_exists($month, $monthlyData)) {
                    $monthlyData[$month] += 1; // Tambahkan satu untuk bulan yang sesuai
                }
            }
            $prodiLabel = $prodiModel->where("id", $prodiInput)->first();
            $response[] = [
                "label" => $prodiLabel["name"],
                "data" => $monthlyData,

            ];
            return $this->response->setJSON($response);
        } else if ($facultyInput != -1) {
            // Fetch prodi related to the faculty
            $prodis = $prodiModel->where("id_faculty", $facultyInput)->findAll();

            $prodiIds = array_column($prodis, 'id');

            // Fetch implementations filtered by prodi IDs within the specified faculty
            $implementations = $implementationModel->whereIn("id_prodi", $prodiIds)
                ->where("YEAR(created_at)", $yearInput)
                ->findAll();

            $prodiMonthlyData = [];
            foreach ($prodis as $prodi) {
                $prodiMonthlyData[$prodi['id']] = $monthlyData;
            }

            foreach ($implementations as $implementation) {
                $prodiId = $implementation['id_prodi'];
                $month = date("n", strtotime($implementation["created_at"]));
                if (array_key_exists($prodiId, $prodiMonthlyData) && array_key_exists($month, $prodiMonthlyData[$prodiId])) {
                    $prodiMonthlyData[$prodiId][$month] += 1;
                }
            }

            $response = [];
            foreach ($prodis as $prodi) {
                $prodiId = $prodi['id'];
                $response[] = [
                    "label" => $prodi['name'],
                    "data" => $prodiMonthlyData[$prodiId]
                ];
            }

            return $this->response->setJSON($response);
        } else {
            // Handle cases where no specific prodi or faculty is selected (e.g., all faculties)
            $faculties = $facultyModel->findAll();
            $response = [];

            foreach ($faculties as $faculty) {
                $facultyId = $faculty["id"];
                $prodis = $prodiModel->where("id_faculty", $facultyId)->findAll();
                $prodiIds = array_column($prodis, 'id');

                $monthlyData = [];
                for ($i = 1; $i <= 12; $i++) {
                    $monthlyData[$i] = 0;
                }

                // Fetch implementations for each prodi within the faculty
                foreach ($prodiIds as $prodiId) {
                    $implementations = $implementationModel->where("YEAR(created_at)", $yearInput)
                        ->where("id_prodi", $prodiId)
                        ->findAll();

                    foreach ($implementations as $implementation) {
                        $month = date("n", strtotime($implementation["created_at"]));
                        if (array_key_exists($month, $monthlyData)) {
                            $monthlyData[$month] += 1;
                        }
                    }
                }

                $response[] = [
                    "label" => $faculty["name"],
                    "data" => $monthlyData,
                ];
            }

            return $this->response->setJSON($response);
        }
    }
}
