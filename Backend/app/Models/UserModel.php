<?php

namespace App\Models;

use CodeIgniter\Model;

class UserModel extends Model
{
    protected $table            = 'users';
    protected $primaryKey       = 'id';
    protected $useAutoIncrement = true;
    protected $allowedFields    = ['username', 'password'];


    function getAllUser()
    {
        $builder = $this->db->table('users');
        $data = $builder->select('users.id AS id, users.username AS username, GROUP_CONCAT(DISTINCT roles.name) AS roles, MAX(prodi.id) AS prodi_id, MAX(prodi.name) AS prodi_name, MAX(facultys.id) AS faculty_id, MAX(facultys.name) AS faculty_name')
            ->join('user_role', 'user_role.user_id = users.id', 'left')
            ->join('roles', 'roles.id = user_role.role_id', 'left')
            ->join('prodi_user', 'prodi_user.user_id = users.id', 'left')
            ->join('prodi', 'prodi.id = prodi_user.prodi_id', 'left')
            ->join('facultys', 'facultys.id = prodi.id_faculty', 'left')  // Correct table name for faculty
            ->groupBy('users.id')
            ->get()->getResult();

        foreach ($data as &$row) {
            // Roles as array
            $row->roles = explode(',', $row->roles);

            // Prodi object
            $row->prodi = (object)[
                'id' => $row->prodi_id,
                'name' => $row->prodi_name
            ];

            // Faculty object based on the user's prodi
            $row->faculty = (object)[
                'id' => $row->faculty_id,
                'name' => $row->faculty_name
            ];

            // Unset individual prodi and faculty fields
            unset($row->prodi_id, $row->prodi_name, $row->faculty_id, $row->faculty_name);
        }

        return $data;
    }



    function getRoleById($id = null)
    {
        $builder = $this->db->table('roles');
        $builder = $this->db->table('users');
        $data = $builder->select('users.id AS id, users.username AS username, GROUP_CONCAT(roles.name) AS roles')
            ->join('user_role', 'user_role.user_id = users.id')
            ->join('roles', 'roles.id = user_role.role_id')
            ->where('users.id', $id)
            ->groupBy('users.id')
            ->get()->getResult();

        return $data[0];
    }
}
