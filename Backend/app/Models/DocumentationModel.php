<?php

namespace App\Models;

use CodeIgniter\Model;

class DocumentationModel extends Model
{
    protected $table            = 'documentation';
    protected $primaryKey       = 'id';
    protected $useAutoIncrement = true;
    protected $allowedFields    = ['id_cooperation', "id_type", 'name', 'title', 'file_image'];
}
