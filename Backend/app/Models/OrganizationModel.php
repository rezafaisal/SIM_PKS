<?php

namespace App\Models;

use CodeIgniter\Model;

class OrganizationModel extends Model
{
    protected $table            = 'organization';
    protected $primaryKey       = 'id';
    protected $useAutoIncrement = true;
    protected $allowedFields    = ['id_parent', 'name'];

    public function getAllOrganization($id_parent = null)
    {
        // Ambil data berdasarkan id_parent
        $builder = $this->builder();

        // Jika $id_parent adalah null, berarti ambil root (organisasi induk)
        if (is_null($id_parent)) {
            $builder->where('id_parent', null);
        } else {
            $builder->where('id_parent', $id_parent);
        }

        // Dapatkan hasil query
        $result = $builder->get()->getResultArray();

        // Loop melalui setiap item dan dapatkan child (anak organisasi)
        foreach ($result as &$organization) {
            $organization['children'] = $this->getAllOrganization($organization['id']);
        }
        return $result;
    }

    public function getAllOrganizationsWithLevels($id_parent = null, $level = 1, $parentName = null)
    {
        // Prepare the query to fetch organizations based on the parent ID
        $builder = $this->builder();

        // Check if fetching root level or sub-level organizations
        if (is_null($id_parent)) {
            $builder->where('id_parent', null);
        } else {
            $builder->where('id_parent', $id_parent);
        }

        // Execute the query and get results
        $result = $builder->get()->getResultArray();

        // Create an array to hold the organizations with level info
        $organizationsWithLevels = [];

        // Traverse each organization item
        foreach ($result as $organization) {
            // Get the parent name if the organization has a parent
            $currentParentName = $parentName ?: ($organization['id_parent'] ? $this->find($organization['id_parent'])['name'] : null);

            // Add the organization with the current level and parent name to the array
            $organizationsWithLevels[] = [
                'id' => $organization['id'],
                'id_parent' => $organization['id_parent'],
                'name' => $organization['name'],
                'level' => $level,
                'parent_name' => $currentParentName
            ];

            // Recursively get the children of this organization, incrementing the level
            $children = $this->getAllOrganizationsWithLevels($organization['id'], $level + 1, $organization['name']);

            // Merge children into the main array
            $organizationsWithLevels = array_merge($organizationsWithLevels, $children);
        }

        return $organizationsWithLevels;
    }
}
