<?php

namespace App\Models;

use CodeIgniter\Model;

class CooperationContactModel extends Model
{
    protected $table            = 'cooperation_contact';
    protected $allowedFields    = ['cooperation_id', 'contact_id'];
}
