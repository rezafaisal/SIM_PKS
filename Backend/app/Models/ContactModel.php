<?php

namespace App\Models;

use CodeIgniter\Model;

class ContactModel extends Model
{
    protected $table            = 'contact';
    protected $primaryKey       = 'id';
    protected $useAutoIncrement = true;
    protected $allowedFields    = ['id_faculty', 'name', 'nip', 'position', 'address', 'handphone_no', 'email', 'status'];

    public function getAllContact()
    {
        // Mengambil data kontak beserta fakultas terkait
        $db = \Config\Database::connect();
        $builder = $db->table('contact');
        $builder->select('contact.*, facultys.name AS facultys_name');
        $builder->join('facultys', 'facultys.id = contact.id_faculty', 'left');
        $query = $builder->get();
        return $query->getResult();
    }
}
