<?php

namespace App\Models;

use CodeIgniter\Model;

class FacultyModel extends Model
{
    protected $table            = 'facultys';
    protected $primaryKey       = 'id';
    protected $useAutoIncrement = true;
    protected $allowedFields    = ['name', 'prodi'];

    public function getAllFaculty()
    {
        // Get all faculties with their respective prodi
        $query = $this->select('facultys.*, GROUP_CONCAT(prodi.name SEPARATOR ", ") as prodi_names')
            ->join('prodi', 'prodi.id_faculty = facultys.id', 'left')
            ->groupBy('facultys.id')
            ->findAll();

        // Convert prodi_names string to array
        foreach ($query as &$faculty) {
            $faculty['prodi_names'] = explode(', ', $faculty['prodi_names']);
        }

        return $query;
    }
}
