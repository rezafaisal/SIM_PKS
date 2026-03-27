<?php

namespace App\Models;

use CodeIgniter\Model;

class CooperationModel extends Model
{
    protected $table            = 'cooperations';
    protected $primaryKey       = 'id';
    protected $useAutoIncrement = true;
    protected $allowedFields    = ['title', 'scope', 'letter_no', 'region', 'expired_date', 'created_at'];

    // Date
    protected $useTimeStamp = true;
    protected $dateFormat = 'datetime';
    // protected $createdField = 'created_at';
    protected $updatedField = 'updated_at';

    public function getAll()
    {
        $builder = $this->db->table('cooperations');
        $data = $builder->select('cooperations.*, 
    (SELECT GROUP_CONCAT(DISTINCT facultys.name ORDER BY facultys.id) FROM facultys INNER JOIN cooperation_faculty ON facultys.id = cooperation_faculty.faculty_id WHERE cooperation_faculty.cooperation_id = cooperations.id) AS faculty_name, 
    (SELECT GROUP_CONCAT(DISTINCT facultys.id ORDER BY facultys.id) FROM facultys INNER JOIN cooperation_faculty ON facultys.id = cooperation_faculty.faculty_id WHERE cooperation_faculty.cooperation_id = cooperations.id) AS faculty_id, 
    (SELECT GROUP_CONCAT(DISTINCT prodi.name ORDER BY prodi.id) FROM prodi INNER JOIN cooperation_prodi ON prodi.id = cooperation_prodi.prodi_id WHERE cooperation_prodi.cooperation_id = cooperations.id) AS prodi_name, 
    (SELECT GROUP_CONCAT(DISTINCT prodi.id ORDER BY prodi.id) FROM prodi INNER JOIN cooperation_prodi ON prodi.id = cooperation_prodi.prodi_id WHERE cooperation_prodi.cooperation_id = cooperations.id) AS prodi_id, 
    GROUP_CONCAT(DISTINCT contact.id ORDER BY contact.id) AS contact_id, 
    GROUP_CONCAT(DISTINCT contact.name ORDER BY contact.id) AS contact_name, 
    GROUP_CONCAT(DISTINCT contact.nip ORDER BY contact.id) AS contact_nip, 
    GROUP_CONCAT(DISTINCT contact.position ORDER BY contact.id) AS contact_position, 
    GROUP_CONCAT(DISTINCT contact.address ORDER BY contact.id) AS contact_address, 
    GROUP_CONCAT(DISTINCT contact.handphone_no ORDER BY contact.id) AS contact_handphone_no, 
    GROUP_CONCAT(DISTINCT contact.email ORDER BY contact.id) AS contact_email, 
    GROUP_CONCAT(DISTINCT deans.id ORDER BY deans.id) AS deans_id, 
    GROUP_CONCAT(DISTINCT deans.name ORDER BY deans.id) AS deans_name, 
    GROUP_CONCAT(DISTINCT deans.nip ORDER BY deans.id) AS deans_nip, 
    GROUP_CONCAT(DISTINCT deans.position ORDER BY deans.id) AS deans_position, 
    GROUP_CONCAT(DISTINCT deans.period ORDER BY deans.id) AS deans_period, 
    GROUP_CONCAT(DISTINCT partners.name ORDER BY partners.id_cooperation) AS partner_name, 
    GROUP_CONCAT(DISTINCT partners.signatory_name ORDER BY partners.id_cooperation) AS signatory_name, 
    GROUP_CONCAT(DISTINCT partners.signatory_nip ORDER BY partners.id_cooperation) AS signatory_nip, 
    GROUP_CONCAT(DISTINCT partners.signatory_position ORDER BY partners.id_cooperation) AS signatory_position, 
    GROUP_CONCAT(DISTINCT partners.contact_name ORDER BY partners.id_cooperation) AS partnerC_name, 
    GROUP_CONCAT(DISTINCT partners.contact_position ORDER BY partners.id_cooperation) AS partnerC_position, 
    GROUP_CONCAT(DISTINCT partners.contact_handphone_no ORDER BY partners.id_cooperation) AS partnerC_handphone_no, 
    GROUP_CONCAT(DISTINCT partners.contact_address ORDER BY partners.id_cooperation) AS partnerC_address, 
    GROUP_CONCAT(DISTINCT partners.contact_email ORDER BY partners.id_cooperation) AS partnerC_email
    ')
            ->join('cooperation_contact', 'cooperation_contact.cooperation_id = cooperations.id', 'left')
            ->join('contact', 'contact.id = cooperation_contact.contact_id', 'left')
            ->join('cooperation_dean', 'cooperation_dean.cooperation_id = cooperations.id', 'left')
            ->join('deans', 'deans.id = cooperation_dean.dean_id', 'left')
            ->join('partners', 'partners.id_cooperation = cooperations.id', 'left')
            ->groupBy('cooperations.id')
            ->get()->getResult();

        return $data;
    }

    public function getByProdi($prodiId)
    {
        // Select basic fields from implementation and related tables
        $data = $this->select('cooperations.id, cooperations.title, prodi.id AS prodi_id, prodi.name AS prodi_name')
            ->join('cooperation_prodi', 'cooperation_prodi.cooperation_id = cooperations.id', 'left')
            ->join('prodi', 'prodi.id = cooperation_prodi.prodi_id', 'left')
            ->where('prodi.id', $prodiId)
            ->findAll();



        return $data;
    }
}
