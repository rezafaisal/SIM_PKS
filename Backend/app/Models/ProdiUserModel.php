<?php

namespace App\Models;

use CodeIgniter\Model;

class ProdiUserModel extends Model
{
    protected $table            = 'prodi_user';
    protected $allowedFields    = ['prodi_id', 'user_id'];
}
