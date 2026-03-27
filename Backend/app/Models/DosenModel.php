<?php

namespace App\Models;

use CodeIgniter\Model;

class DosenModel extends Model
{
    protected $table            = 'dosen';
    protected $primaryKey       = 'id';
    protected $useAutoIncrement = true;
    protected $allowedFields    = ['id_organization', 'name', 'nip', 'address', 'contact'];

    public function getDosenWithOrganization()
    {
        // Perform a join with the organizations table
        return $this->select('dosen.*, organization.name as organization_name')
            ->join('organization', 'organization.id = dosen.id_organization', 'left')
            ->findAll();
    }
}
