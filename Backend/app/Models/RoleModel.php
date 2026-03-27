<?php

namespace App\Models;

use CodeIgniter\Model;

class RoleModel extends Model
{
    protected $table            = 'roles';
    protected $primaryKey       = 'id';
    protected $useAutoIncrement = true;
    protected $allowedFields    = ['name'];



    function getAllRole()
    {
        $builder = $this->db->table('roles');
        $data = $builder->select('roles.id AS id, roles.name AS name, GROUP_CONCAT(access_pages.name) AS access_pages')
            ->join('access_page_role', 'access_page_role.role_id = roles.id', 'left')
            ->join('access_pages', 'access_pages.id = access_page_role.access_page_id', 'left')
            ->groupBy('roles.id')
            ->get()->getResult();

        foreach ($data as &$row) {
            $row->access_pages = explode(',', $row->access_pages);
        }

        return $data;
    }

    function getRoleById($id = null)
    {
        $builder = $this->db->table('roles');
        $data = $builder->select('roles.id AS id, roles.name AS name, GROUP_CONCAT(access_pages.name) AS access_pages')
            ->join('access_page_role', 'access_page_role.role_id = roles.id')
            ->join('access_pages', 'access_pages.id = access_page_role.access_page_id')
            ->where('roles.id', $id)
            ->groupBy('roles.id')
            ->get()->getResult();

        return $data[0];
    }
}
