<?php

namespace App\Models;

use CodeIgniter\Model;

class CooperationFacultyModel extends Model
{
    protected $table            = 'cooperation_faculty';
    protected $allowedFields    = ['cooperation_id', 'faculty_id'];
}
