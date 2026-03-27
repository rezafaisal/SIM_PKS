<?php

namespace App\Models;

use CodeIgniter\Model;

class AccessPageModel extends Model
{
    protected $table            = 'access_pages';
    protected $primaryKey       = 'id';
    protected $useAutoIncrement = true;
    protected $returnType       = 'object';
    protected $allowedFields    = ['name'];
}
