<?php

namespace App\Models;

use CodeIgniter\Model;

class DeanModel extends Model
{
    protected $table            = 'deans';
    protected $primaryKey       = 'id';
    protected $useAutoIncrement = true;
    protected $allowedFields    = ['id_faculty', 'name', 'nip', 'position', 'period', 'status'];

    public function getAllDean()
    {
        // Mengambil data kontak beserta fakultas terkait
        $db = \Config\Database::connect();
        $builder = $db->table('deans');
        $builder->select('deans.*, facultys.name AS facultys_name');
        $builder->join('facultys', 'facultys.id = deans.id_faculty', 'left');
        $query = $builder->get();
        return $query->getResult();
    }
}
