<?php

namespace App\Models;

use CodeIgniter\Model;

class PartnerModel extends Model
{
    protected $table            = 'partners';
    protected $primaryKey       = 'id';
    protected $useAutoIncrement = true;
    protected $allowedFields    = ['id_cooperation', 'name', 'signatory_name', 'signatory_nip', 'signatory_position', 'contact_name', 'contact_position', 'contact_handphone_no', 'contact_address', 'contact_email'];
}
