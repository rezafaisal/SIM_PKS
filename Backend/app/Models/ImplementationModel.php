<?php

namespace App\Models;

use CodeIgniter\Model;

class ImplementationModel extends Model
{
    protected $table            = 'implementation';
    protected $primaryKey       = 'id';
    protected $useAutoIncrement = true;
    protected $allowedFields    = ['id_cooperation', 'id_prodi', 'name', 'attachment', 'created_at', 'attachment_file'];

    // public function getAll()
    // {
    //     $data = $this->select('implementation.id, cooperations.title AS title_cooperation, implementation.name AS name_implementation, implementation.created_at, prodi.id AS prodi_id, prodi.name AS prodi_name')
    //         ->join('cooperations', 'cooperations.id = implementation.id_cooperation', 'left')
    //         ->join('prodi', 'prodi.id = implementation.id_prodi', 'left')
    //         ->findAll();

    //     $formattedData = [];
    //     foreach ($data as $item) {
    //         $formattedData[] = [
    //             'id' => $item['id'],
    //             'title_cooperation' => $item['title_cooperation'],
    //             'name_implementation' => $item['name_implementation'],
    //             'created_at' => $item['created_at'],
    //             'prodi' => [
    //                 'id' => $item['prodi_id'],
    //                 'name' => $item['prodi_name']
    //             ]
    //         ];
    //     }

    //     return $formattedData;
    // }
    public function getAll()
    {
        // Select basic fields from implementation and related tables
        $data = $this->select('implementation.id, cooperations.id AS id_cooperation, cooperations.title AS title_cooperation, implementation.name AS name_implementation, implementation.attachment, implementation.attachment_file, implementation.created_at, prodi.id AS prodi_id, prodi.name AS prodi_name')
            ->join('cooperations', 'cooperations.id = implementation.id_cooperation', 'left')
            ->join('prodi', 'prodi.id = implementation.id_prodi', 'left')
            ->findAll();

        $formattedData = [];
        // Format the implementation data
        foreach ($data as $item) {
            // Fetch the related prodi for each cooperation using cooperation_prodi table
            $cooperationProdi = $this->db->table('cooperation_prodi')
                ->select('prodi.id, prodi.name')
                ->join('prodi', 'prodi.id = cooperation_prodi.prodi_id')
                ->where('cooperation_prodi.cooperation_id', $item['id_cooperation'])
                ->get()
                ->getResultArray();



            // Format the final data with cooperation and prodi details
            $formattedData[] = [
                'id' => $item['id'],
                'name_implementation' => $item['name_implementation'],
                'created_at' => $item['created_at'],
                'attachment' => $item['attachment'],
                'attachment_file' => $item['attachment_file'] ? base_url('uploads/' . $item['attachment_file']) : null,
                'prodi' => [
                    'id' => $item['prodi_id'],
                    'name' => $item['prodi_name']
                ],
                'cooperation' => [
                    'id' => $item['id_cooperation'],
                    'title' => $item['title_cooperation'],
                    'prodi' => $cooperationProdi // List of related prodi for the cooperation
                ],
            ];
        }

        return $formattedData;
    }

    public function getByProdi($prodiId)
    {
        // Select basic fields from implementation and related tables
        $data = $this->select('implementation.id, cooperations.id AS id_cooperation, cooperations.title AS title_cooperation, implementation.name AS name_implementation, implementation.attachment, implementation.attachment_file, implementation.created_at, prodi.id AS prodi_id, prodi.name AS prodi_name')
            ->join('cooperations', 'cooperations.id = implementation.id_cooperation', 'left')
            ->join('prodi', 'prodi.id = implementation.id_prodi', 'left')
            ->where('prodi.id', $prodiId) // Filter by prodiId
            ->findAll();

        $formattedData = [];
        // Format the implementation data
        foreach ($data as $item) {
            // Fetch the related prodi for each cooperation using cooperation_prodi table
            $cooperationProdi = $this->db->table('cooperation_prodi')
                ->select('prodi.id, prodi.name')
                ->join('prodi', 'prodi.id = cooperation_prodi.prodi_id')
                ->where('cooperation_prodi.cooperation_id', $item['id_cooperation'])
                ->get()
                ->getResultArray();



            // Format the final data with cooperation and prodi details
            $formattedData[] = [
                'id' => $item['id'],
                'name_implementation' => $item['name_implementation'],
                'created_at' => $item['created_at'],
                'attachment' => $item['attachment'],
                'attachment_file' => $item['attachment_file'] ? base_url('uploads/' . $item['attachment_file']) : null,
                'prodi' => [
                    'id' => $item['prodi_id'],
                    'name' => $item['prodi_name']
                ],
                'cooperation' => [
                    'id' => $item['id_cooperation'],
                    'title' => $item['title_cooperation'],
                    'prodi' => $cooperationProdi // List of related prodi for the cooperation
                ]
            ];
        }

        return $formattedData;
    }
}
