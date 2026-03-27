<?php

namespace App\Models;

use CodeIgniter\Model;

class CooperationProdiModel extends Model
{
    protected $table            = 'cooperation_prodi';
    protected $allowedFields    = ['cooperation_id', 'prodi_id'];
}
