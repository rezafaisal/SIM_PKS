<?php

namespace App\Controllers;

use App\Models\ContactModel;
use App\Models\CooperationContactModel;
use App\Models\CooperationDeanModel;
use App\Models\CooperationFacultyModel;
use App\Models\CooperationProdiModel;
use App\Models\CooperationModel;
use App\Models\DeanModel;
use App\Models\ImplementationModel;
use App\Models\FacultyModel;
use App\Models\DocumentationModel;
use App\Models\PartnerModel;
use App\Models\ProdiModel;
use App\Models\TypeModel;
use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\HTTP\ResponseInterface;
use DateTime;

class CooperationController extends ResourceController
{

    public function getAllCooperation()
    {
        try {
            // Fetch all cooperation data
            $cooperationModel = new CooperationModel();
            $cooperations = $cooperationModel->getAll();
            $typeData = new TypeModel();
            $response = [];
            // Iterate through each cooperation
            foreach ($cooperations as $cooperation) {
                // Fetch partner data

                $partnerData = [
                    'partner_name' => $cooperation->partner_name,
                    'signatory_name' => $cooperation->signatory_name,
                    'signatory_nip' => $cooperation->signatory_nip,
                    'signatory_position' => $cooperation->signatory_position,
                    'contact_name' => $cooperation->partnerC_name,
                    'contact_position' => $cooperation->partnerC_position,
                    'contact_handphone_no' => $cooperation->partnerC_handphone_no,
                    'contact_address' => $cooperation->partnerC_address,
                    'contact_email' => $cooperation->partnerC_email
                ];

                // Fetch dean data
                $deanData = [
                    'name' => $cooperation->deans_name,
                    'nip' => $cooperation->deans_nip,
                    'position' => $cooperation->deans_position,
                    'period' => $cooperation->deans_period
                ];

                // Fetch contact data
                $contactData = [
                    'name' => $cooperation->contact_name,
                    'nip' => $cooperation->contact_nip,
                    'position' => $cooperation->contact_position,
                    'address' => $cooperation->contact_address,
                    'handphone_no' => $cooperation->contact_handphone_no,
                    'email' => $cooperation->contact_email
                ];
                // Fetch documentations for this cooperation
                $documentationModel = new DocumentationModel();
                $documentations = $documentationModel->where('id_cooperation', $cooperation->id)->findAll();

                // Fetch implementations for this cooperation
                $implementationModel = new ImplementationModel();
                $implementations = $implementationModel->where('id_cooperation', $cooperation->id)->findAll();

                // Process documentation file images
                $processedDocumentations = [];

                foreach ($documentations as $documentation) {
                    $typeGet = $typeData->where('id', $documentation["id_type"])->first();
                    $documentation = (object) $documentation;

                    $processedDocumentations[] = [
                        'id' => $documentation->id,
                        'name' => $documentation->name,
                        'title' => $documentation->title,
                        'type' => $typeGet,
                        'file_image' => base_url('uploads/' . $documentation->file_image), // Provide the URL to the image
                    ];
                }

                // Process implementation attachment files
                $processedImplementations = [];
                foreach ($implementations as $implementation) {
                    $implementation = (object) $implementation;

                    $prodiIm = "";
                    if ($implementation->id_prodi) {
                        $prodiModel = new ProdiModel();
                        $prodiIm = $prodiModel->where('id', $implementation->id_prodi)->first();
                    }
                    $processedImplementations[] = [
                        'id' => $implementation->id,
                        'created_at' => $implementation->created_at,
                        'prodi' => $prodiIm,
                        'name' => $implementation->name,
                        'attachment' => $implementation->attachment,
                        'attachment_file' => $implementation->attachment_file ? base_url('uploads/' . $implementation->attachment_file) : null, // If attachment_file exists, provide its URL, else use attachment
                    ];
                }


                // Fetch prodi data
                $prodiIds = explode(',', $cooperation->prodi_id);
                $prodiNames = explode(',', $cooperation->prodi_name);

                $prodiData = [];

                foreach ($prodiIds as $index => $id) {
                    if (isset($prodiNames[$index])) {
                        $prodiData[] = [
                            'name' => trim($prodiNames[$index]),  // Trim to remove any extra spaces
                            'id' => trim($id)                     // Same for ID
                        ];
                    }
                }


                $letter_no = explode(', ', $cooperation->letter_no);
                // Build the response structure
                $response[] = [
                    'id' => $cooperation->id,
                    'title' => $cooperation->title,
                    'scope' => $cooperation->scope,
                    'region' => $cooperation->region,
                    'createdDate' => $cooperation->created_at,
                    'expiredDate' => $cooperation->expired_date,
                    'letterNo' => $letter_no,
                    'faculty' => $cooperation->faculty_name,
                    'dean' => $deanData,
                    'contact' => $contactData,
                    'prodi' => $prodiData,
                    'partner' => $partnerData,
                    'implementation' => $processedImplementations,
                    'documentation' => $processedDocumentations,
                ];
            }

            // Return JSON response
            return $this->response->setJSON($response);
        } catch (\Exception $e) {
            return $this->failServerError($e->getMessage());
        }
    }

    public function getByIdCooperation($id)
    {
        try {
            $cooperationModel = new CooperationModel();
            $cooperations = $cooperationModel->getAll();
            $typeData = new TypeModel();
            $response = [];
            $cooperation = null;
            foreach ($cooperations as $coop) {
                if ($coop->id == $id) {
                    $cooperation = $coop;
                    break;
                }
            }

            if (!$cooperation) {
                return $this->failNotFound('Cooperation not found');
            }

            // Fetch partner data

            $partnerData = [
                'partner_name' => $cooperation->partner_name,
                'signatory_name' => $cooperation->signatory_name,
                'signatory_nip' => $cooperation->signatory_nip,
                'signatory_position' => $cooperation->signatory_position,
                'contact_name' => $cooperation->partnerC_name,
                'contact_position' => $cooperation->partnerC_position,
                'contact_handphone_no' => $cooperation->partnerC_handphone_no,
                'contact_address' => $cooperation->partnerC_address,
                'contact_email' => $cooperation->partnerC_email
            ];

            // Fetch documentations for this cooperation
            $documentationModel = new DocumentationModel();
            $documentations = $documentationModel->where('id_cooperation', $cooperation->id)->findAll();

            // Fetch implementations for this cooperation
            $implementationModel = new ImplementationModel();
            $implementations = $implementationModel->where('id_cooperation', $cooperation->id)->findAll();

            // Process documentation file images
            $processedDocumentations = [];
            foreach ($documentations as $documentation) {
                $typeGet = $typeData->where('id', $documentation["id_type"])->first();
                $documentation = (object) $documentation;
                $processedDocumentations[] = [
                    'id' => $documentation->id,
                    'name' => $documentation->name,
                    'title' => $documentation->title,
                    'type' => $typeGet,
                    'file_image' => base_url('uploads/' . $documentation->file_image), // Provide the URL to the image
                ];
            }

            // Process implementation attachment files
            $processedImplementations = [];
            foreach ($implementations as $implementation) {
                $implementation = (object) $implementation;

                $prodiIm = "";
                if ($implementation->id_prodi) {
                    $prodiModel = new ProdiModel();
                    $prodiIm = $prodiModel->where('id', $implementation->id_prodi)->first();
                }

                $processedImplementations[] = [
                    'id' => $implementation->id,
                    'created_at' => $implementation->created_at,
                    'prodi' => $prodiIm,
                    'name' => $implementation->name,
                    'attachment' => $implementation->attachment,
                    'attachment_file' => $implementation->attachment_file ? base_url('uploads/' . $implementation->attachment_file) : null, // If attachment_file exists, provide its URL, else use attachment
                ];
            }


            // Fetch prodi data
            $prodiId = explode(',', $cooperation->prodi_id);
            $prodiName = explode(',', $cooperation->prodi_name);

            $prodiData = [];

            foreach ($prodiId as $index => $id) {
                // Create an associative arr`ay for each pair of prodi name and id
                $prodiData[] = [
                    'name' => $prodiName[$index],
                    'id' => $id
                ];
            }
            $letter_no = explode(', ', $cooperation->letter_no);
            // Build the response structure
            $response = [
                'id' => $cooperation->id,
                'title' => $cooperation->title,
                'scope' => $cooperation->scope,
                'region' => $cooperation->region,
                'createdDate' => $cooperation->created_at,
                'expiredDate' => $cooperation->expired_date,
                'letterNo' => $letter_no,
                'faculty' => $cooperation->faculty_id,
                'dean' => $cooperation->deans_id,
                'contact' => $cooperation->contact_id,
                'prodi' => $prodiData,
                'partner' => $partnerData,
                'implementation' => $processedImplementations,
                'documentation' => $processedDocumentations,
            ];

            return $this->response->setJSON($response);
        } catch (\Exception $e) {
            return $this->failServerError($e->getMessage());
        }
    }

    public function getWithProdiOnly()
    {
        $cooperationModel = new CooperationModel();
        $cooperations = $cooperationModel->getAll();
        $response = [];

        foreach ($cooperations as $cooperation) {

            $prodiId = explode(',', $cooperation->prodi_id);
            $prodiName = explode(',', $cooperation->prodi_name);

            $prodiData = [];

            foreach ($prodiId as $index => $id) {
                // Create an associative arr`ay for each pair of prodi name and id
                $prodiData[] = [
                    'name' => $prodiName[$index],
                    'id' => $id
                ];
            }
            $response[] = [
                'id' => $cooperation->id,
                'title' => $cooperation->title,
                'prodi' => $prodiData
            ];
        }
        return $this->response->setJSON($response);
    }

    public function getBaseProdi($prodiId)
    {
        $cooperationModel = new CooperationModel();
        $cooperations = $cooperationModel->getByProdi($prodiId);

        $response = [];
        foreach ($cooperations as $cooperation) {
            $response[] = [
                'id' => $cooperation['id'],
                'title' => $cooperation['title'],
                'prodi' => [
                    'name' => $cooperation['prodi_name'],
                    'id' => $cooperation['prodi_id']
                ]
            ];
        }
        return $this->respond($response, 200);
    }

    public function createCooperation()
    {
        // Validasi input
        $rules = [
            'title' => 'required',
            'createdDate' => 'permit_empty|valid_date',
            'expiredDate' => 'permit_empty|valid_date',
            'facultyName' => 'permit_empty|numeric',
            'deanName' => 'permit_empty|numeric',
            'region' => 'permit_empty',
            'scope' => 'permit_empty',
            'contactName' => 'permit_empty|numeric',
            'prodi' => 'permit_empty',
            'partner_name' => 'permit_empty',
            'letterNo1' => 'permit_empty',
            'letterNo2' => 'permit_empty',
            'signatory_name' => 'permit_empty',
            'signatory_nip' => 'permit_empty',
            'signatory_position' => 'permit_empty',
            'contact_name' => 'permit_empty',
            'contact_position' => 'permit_empty',
            'contact_handphone_no' => 'permit_empty',
            'contact_address' => 'permit_empty',
            'contact_email' => 'permit_empty|valid_email'
        ];

        if (!$this->validate($rules)) {
            return $this->failValidationErrors($this->validator->getErrors());
        }

        // Insert data into cooperation table
        $cooperationModel = new CooperationModel();
        $cooperationData = [
            'title' => $this->request->getVar('title'),
            'created_at' => $this->request->getVar('createdDate'),
            'expired_date' => $this->request->getVar('expiredDate'),
            'region' => $this->request->getVar('region'),
            'scope' => $this->request->getVar('scope'),
            'letter_no' => $this->request->getVar('letterNo1') . ', ' . $this->request->getVar('letterNo2')
        ];
        $cooperationId = $cooperationModel->insert($cooperationData);

        // Insert data into partner table
        $partnerModel = new PartnerModel();
        $partnerData = [
            'id_cooperation' => $cooperationId,
            'name' => $this->request->getVar('partner_name'),
            'signatory_name' => $this->request->getVar('signatory_name'),
            'signatory_nip' => $this->request->getVar('signatory_nip'),
            'signatory_position' => $this->request->getVar('signatory_position'),
            'contact_name' => $this->request->getVar('contact_name'),
            'contact_position' => $this->request->getVar('contact_position'),
            'contact_handphone_no' => $this->request->getVar('contact_handphone_no'),
            'contact_address' => $this->request->getVar('contact_address'),
            'contact_email' => $this->request->getVar('contact_email')
        ];
        $partnerModel->insert($partnerData);

        // Add related records for faculty, dean, contact, and prodi (many-to-many)
        // Mulai transaksi
        $db = db_connect();
        $db->transStart();

        try {

            // Insert data into faculty, dean, contact, and prodi tables (if not exist)
            $facultyName = $this->request->getVar('facultyName');
            $deanName = $this->request->getVar('deanName');
            $contactName = $this->request->getVar('contactName');
            $prodiIds = $this->request->getVar('prodi');

            // Check if faculty, dean, contact, and prodi exist
            $facultyModel = new FacultyModel();
            $faculty = $facultyModel->find($facultyName);
            $deanModel = new DeanModel();
            $dean = $deanModel->find($deanName);
            $contactModel = new ContactModel();
            $contact = $contactModel->find($contactName);
            $prodiModel = new ProdiModel();


            // Insert new records into cooperation_faculty, cooperation_dean, cooperation_contact, and cooperation_prodi tables
            if ($faculty) {
                $cooperationFacultyModel = new CooperationFacultyModel();
                $cooperationFacultyModel->insert(['cooperation_id' => $cooperationId, 'faculty_id' => $facultyName]);
            }
            if ($dean) {
                $cooperationDeanModel = new CooperationDeanModel();
                $cooperationDeanModel->insert(['cooperation_id' => $cooperationId, 'dean_id' => $deanName]);
            }
            if ($contact) {
                $cooperationContactModel = new CooperationContactModel();
                $cooperationContactModel->insert(['cooperation_id' => $cooperationId, 'contact_id' => $contactName]);
            }
            foreach ($prodiIds as $prodiId) {
                $prodi = $prodiModel->find($prodiId);

                if ($prodi) {

                    $cooperationProdiModel = new CooperationProdiModel();
                    $cooperationProdiModel->insert(['cooperation_id' => $cooperationId, 'prodi_id' => $prodiId]);
                }
            }

            // Commit transaction
            $db->transCommit();

            // Return success response
            return $this->respondCreated(['message' => 'Cooperation created successfully']);
        } catch (\Exception $e) {
            // Rollback transaction on error
            $db->transRollback();
            return $this->failServerError($e->getMessage());
        }

        // Return success response
        return $this->respondCreated(['message' => 'Cooperation created successfully']);
    }
    public function updateCooperation($id)
    {
        try {
            // Fetch cooperation data by ID
            $cooperationModel = new CooperationModel();
            $cooperation = $cooperationModel->find($id);

            // Check if the cooperation exists
            if (!$cooperation) {
                return $this->failNotFound('Cooperation not found');
            }

            // Validasi input
            $rules = [
                'title' => 'required',
                'createdDate' => 'permit_empty|valid_date',
                'expiredDate' => 'permit_empty|valid_date',
                'facultyName' => 'permit_empty|numeric',
                'deanName' => 'permit_empty|numeric',
                'region' => 'permit_empty',
                'scope' => 'permit_empty',
                'contactName' => 'permit_empty|numeric',
                'prodi' => 'permit_empty',
                'partner_name' => 'permit_empty',
                'letterNo1' => 'permit_empty',
                'letterNo2' => 'permit_empty',
                'signatory_name' => 'permit_empty',
                'signatory_nip' => 'permit_empty',
                'signatory_position' => 'permit_empty',
                'contact_name' => 'permit_empty',
                'contact_position' => 'permit_empty',
                'contact_handphone_no' => 'permit_empty',
                'contact_address' => 'permit_empty',
                'contact_email' => 'permit_empty|valid_email'
            ];

            if (!$this->validate($rules)) {
                return $this->failValidationErrors($this->validator->getErrors());
            }

            // Update data in the cooperation table
            $cooperationData = [
                'title' => $this->request->getVar('title'),
                'created_at' => $this->request->getVar('createdDate'),
                'expired_date' => $this->request->getVar('expiredDate'),
                'region' => $this->request->getVar('region'),
                'scope' => $this->request->getVar('scope'),
                'letter_no' => $this->request->getVar('letterNo1') . ', ' . $this->request->getVar('letterNo2')
            ];
            $cooperationModel->update($id, $cooperationData);

            // Update data in the partner table
            $partnerModel = new PartnerModel();

            $partnerData = [
                'name' => $this->request->getVar('partner_name'),
                'signatory_name' => $this->request->getVar('signatory_name'),
                'signatory_nip' => $this->request->getVar('signatory_nip'),
                'signatory_position' => $this->request->getVar('signatory_position'),
                'contact_name' => $this->request->getVar('contact_name'),
                'contact_position' => $this->request->getVar('contact_position'),
                'contact_handphone_no' => $this->request->getVar('contact_handphone_no'),
                'contact_address' => $this->request->getVar('contact_address'),
                'contact_email' => $this->request->getVar('contact_email')
            ];

            $partnerModel->where('id_cooperation', $id)->set($partnerData)->update();

            // Delete existing related records for faculty, dean, contact, and prodi (many-to-many)
            $cooperationFacultyModel = new CooperationFacultyModel();
            $cooperationFacultyModel->where('cooperation_id', $id)->delete();
            $cooperationDeanModel = new CooperationDeanModel();
            $cooperationDeanModel->where('cooperation_id', $id)->delete();
            $cooperationContactModel = new CooperationContactModel();
            $cooperationContactModel->where('cooperation_id', $id)->delete();
            $cooperationProdiModel = new CooperationProdiModel();
            $cooperationProdiModel->where('cooperation_id', $id)->delete();

            // Add related records for faculty, dean, contact, and prodi (many-to-many)
            // Mulai transaksi
            $db = db_connect();
            $db->transStart();

            try {

                // Insert data into faculty, dean, contact, and prodi tables (if not exist)
                $facultyName = $this->request->getVar('facultyName');
                $deanName = $this->request->getVar('deanName');
                $contactName = $this->request->getVar('contactName');
                $prodiIds = $this->request->getVar('prodi');

                // Check if faculty, dean, contact, and prodi exist
                $facultyModel = new FacultyModel();
                $faculty = $facultyModel->find($facultyName);
                $deanModel = new DeanModel();
                $dean = $deanModel->find($deanName);
                $contactModel = new ContactModel();
                $contact = $contactModel->find($contactName);
                $prodiModel = new ProdiModel();


                // Insert new records into cooperation_faculty, cooperation_dean, cooperation_contact, and cooperation_prodi tables
                if ($faculty) {
                    $cooperationFacultyModel->insert(['cooperation_id' => $id, 'faculty_id' => $facultyName]);
                }
                if ($dean) {
                    $cooperationDeanModel->insert(['cooperation_id' => $id, 'dean_id' => $deanName]);
                }
                if ($contact) {
                    $cooperationContactModel->insert(['cooperation_id' => $id, 'contact_id' => $contactName]);
                }
                foreach ($prodiIds as $prodiId) {
                    $prodi = $prodiModel->find($prodiId);

                    if ($prodi) {

                        $cooperationProdiModel->insert(['cooperation_id' => $id, 'prodi_id' => $prodiId]);
                    }
                }

                // Commit transaction
                $db->transCommit();

                // Return success response
                return $this->respond(['message' => 'Cooperation updated successfully']);
            } catch (\Exception $e) {
                // Rollback transaction on error
                $db->transRollback();
                return $this->failServerError($e->getMessage());
            }
        } catch (\Exception $e) {
            return $this->failServerError($e->getMessage());
        }
    }
    public function deleteCooperation($id)
    {
        try {
            // Fetch cooperation data by ID
            $cooperationModel = new CooperationModel();
            $cooperation = $cooperationModel->find($id);

            // Check if the cooperation exists
            if (!$cooperation) {
                return $this->failNotFound('Cooperation not found');
            }

            // Mulai transaksi
            $db = db_connect();
            $db->transStart();

            try {
                // Delete related records from cooperation_faculty, cooperation_dean, cooperation_contact, and cooperation_prodi tables
                $cooperationFacultyModel = new CooperationFacultyModel();
                $cooperationFacultyModel->where('cooperation_id', $id)->delete();
                $cooperationDeanModel = new CooperationDeanModel();
                $cooperationDeanModel->where('cooperation_id', $id)->delete();
                $cooperationContactModel = new CooperationContactModel();
                $cooperationContactModel->where('cooperation_id', $id)->delete();
                $cooperationProdiModel = new CooperationProdiModel();
                $cooperationProdiModel->where('cooperation_id', $id)->delete();

                // Delete related records from partner table
                $partnerModel = new PartnerModel();
                $partnerModel->where('id_cooperation', $id)->delete();

                // Delete related records from documentation and implementation tables (assuming they have foreign key constraint with cooperation table)
                $documentationModel = new DocumentationModel();
                $documentationModel->where('id_cooperation', $id)->delete();
                $implementationModel = new ImplementationModel();
                $implementationModel->where('id_cooperation', $id)->delete();

                // Delete cooperation record
                $cooperationModel->delete($id);

                // Commit transaction
                $db->transCommit();

                // Return success response
                return $this->respondDeleted(['message' => 'Cooperation deleted successfully']);
            } catch (\Exception $e) {
                // Rollback transaction on error
                $db->transRollback();
                return $this->failServerError($e->getMessage());
            }
        } catch (\Exception $e) {
            return $this->failServerError($e->getMessage());
        }
    }
    public function filterCooperation()
    {
        try {
            // Fetch all cooperation data
            $cooperationModel = new CooperationModel();
            $cooperations = $cooperationModel->getAll();

            $total = count($cooperations); // Total semua cooperation

            // Definisikan tanggal saat ini
            $currentDate = new DateTime();

            $progress = 0; // Menghitung cooperation yang masih berjalan
            $deadline = 0; // Menghitung cooperation yang hampir habis masa cooperation
            $complete = 0; // Menghitung cooperation yang telah melewati masa cooperation
            $hold = 0; // Menghitung cooperation yang tidak memiliki expired_date (ditunda/hold)

            // Iterate through each cooperation
            foreach ($cooperations as $cooperation) {
                // Kalkulasi jarak hari dengan expired_date
                if (empty($cooperation->expired_date)) {
                    $hold++; // Cooperation is on hold (expired_date is not set)
                } else {
                    // Kalkulasi jarak hari dengan expired_date
                    $expiredDate = new DateTime($cooperation->expired_date);
                    $interval = $currentDate->diff($expiredDate)->days;

                    if ($expiredDate < $currentDate) {
                        $complete++; // Sudah melewati masa cooperation
                    } elseif ($interval > 29) {
                        $progress++; // Cooperation masih berjalan
                    } else {
                        $deadline++; // Hampir habis masa cooperation
                    }
                }
            }

            $response = [
                'total' => $total,
                'progress' => $progress,
                'deadline' => $deadline,
                'complete' => $complete,
                'hold' => $hold
            ];

            // Return JSON response
            return $this->response->setJSON($response);
        } catch (\Exception $e) {
            return $this->failServerError($e->getMessage());
        }
    }

    public function graphCooperationMonth($year, $region)
    {
        try {
            // Model untuk mengambil data kerja sama
            $cooperationModel = new CooperationModel();

            // Inisiasi data untuk setiap bulan
            $monthlyData = [];
            for ($i = 1; $i <= 12; $i++) {
                $monthlyData[$i] = 0; // Inisiasi setiap bulan dengan 0
            }

            // Ambil semua kerja sama yang dibuat pada tahun yang diberikan
            if ($region === "Semua") {
                // Ambil semua kerja sama yang dibuat pada tahun yang diberikan tanpa filter region
                $cooperations = $cooperationModel->where("YEAR(created_at)", $year)->findAll();
            } else {
                // Ambil semua kerja sama yang dibuat pada tahun yang diberikan dan sesuai dengan region
                $cooperations = $cooperationModel
                    ->where("YEAR(created_at)", $year)
                    ->where("region", $region)  // Filter based on region if not "All"
                    ->findAll();
            }

            // Hitung kerja sama berdasarkan bulan
            foreach ($cooperations as $cooperation) {
                // Ambil bulan dari created_at
                $month = date("n", strtotime($cooperation["created_at"]));

                if (array_key_exists($month, $monthlyData)) {
                    $monthlyData[$month] += 1; // Tambahkan satu untuk bulan yang sesuai
                }
            }

            // Bangun respons
            $response[] = [
                "tahun" => $year,
                "region" => $region,
                "months" => $monthlyData,
            ];

            // Kembalikan JSON response
            return $this->response->setJSON($response);
        } catch (\Exception $e) {
            return $this->failServerError($e->getMessage());
        }
    }

    public function graphCooperationYear($year, $region)
    {
        try {
            // Model untuk mengambil data kerja sama
            $cooperationModel = new CooperationModel();

            // Inisiasi data untuk setiap tahun
            $yearlyData = [];
            $labels = [];
            // Urutkan mundur dari tahun yang diberikan
            for ($i = 1; $i <= 6; $i++) {
                $targetYear = $year - (6 - $i); // Hitung tahun mundur
                $yearlyData[$i] = 0; // Inisiasi setiap tahun dengan 0

                // Ambil jumlah kerja sama untuk tahun yang diberikan
                // $count = $cooperationModel->where("YEAR(created_at)", $targetYear)->countAllResults();

                if ($region === "Semua") {
                    // Ambil semua kerja sama yang dibuat pada tahun yang diberikan tanpa filter region
                    $count = $cooperationModel->where("YEAR(created_at)", $targetYear)->countAllResults();
                } else {
                    // Ambil semua kerja sama yang dibuat pada tahun yang diberikan dan sesuai dengan region
                    $count = $cooperationModel
                        ->where("YEAR(created_at)", $targetYear)
                        ->where("region", $region)  // Filter based on region if not "All"
                        ->countAllResults();
                }

                $yearlyData[$i] = $count; // Simpan hasil
                $labels[] = (string) $targetYear;
            }

            // Buat respons
            $response[] = [
                "tahun" => $year,
                "years" => $yearlyData,
                "region" => $region,
                "label" => $labels,
            ];

            // Kembalikan JSON response
            return $this->response->setJSON($response);
        } catch (\Exception $e) {
            return $this->failServerError($e->getMessage());
        }
    }
}
