<?php

namespace App\Models;

use CodeIgniter\Model;

class RoleAccessModel extends Model
{
    protected $table            = 'access_page_role';
    protected $returnType       = 'object';
    protected $allowedFields    = ['role_id', 'access_page_id'];
}
