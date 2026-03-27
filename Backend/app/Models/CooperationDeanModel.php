<?php

namespace App\Models;

use CodeIgniter\Model;

class CooperationDeanModel extends Model
{
    protected $table            = 'cooperation_dean';
    protected $allowedFields    = ['cooperation_id', 'dean_id'];
}
