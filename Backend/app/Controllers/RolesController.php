<?php

namespace App\Controllers;

use App\Models\RoleAccessModel;
use App\Models\RoleModel;
use App\Models\UserRoleModel;
use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\HTTP\ResponseInterface;

class RolesController extends ResourceController
{
    protected $modelName = 'App\Models\RoleModel';
    protected $format = 'json';
    /**
     * Return an array of resource objects, themselves in array format
     *
     * @return ResponseInterface
     */
    public function getAll()
    {
        $model = new RoleModel();
        $data = $model->getAllRole();
        return $this->respond($data, 200);
    }

    public function getRoleById($id = null)
    {
        $model = new RoleModel();
        $data = $model->getRoleById($id);
        if ($data) {
            return $this->respond($data, 200);
        } else {
            return $this->fail('Role tidak ditemukan', 404);
        }
    }

    public function add()
    {
        $model = new RoleModel();
        $data = $this->request->getJSON();
        $insert = $model->insert($data);
        if ($insert) {
            $roleId = $model->getInsertID();
            if (isset($data->access_page)) { // Check if access_page is set in $data
                foreach ($data->access_page as $pageId) {
                    $this->addPage($roleId, $pageId);
                }
            }
            return $this->respondCreated(['message' => 'Role berhasil ditambahkan', 'data' => $data], 201);
        } else {
            return $this->fail('Gagal menambahkan role', 400);
        }
    }

    public function update($id = null)
    {
        $model = new RoleModel();
        $data = $this->request->getJSON();

        // First, retrieve the current role data
        $currentRole = $model->find($id);

        if ($currentRole) {
            // Perform the update on the role
            $update = $model->update($id, $data);

            if ($update) {
                // Update corresponding entries in the 'access_page_role' table
                if (isset($data->access_page)) {
                    $roleAccessModel = new RoleAccessModel();
                    // Delete existing entries for the role from the 'access_page_role' table
                    $roleAccessModel->where('role_id', $id)->delete();

                    // Insert new entries for the role into the 'access_page_role' table
                    foreach ($data->access_page as $accessPageId) {
                        $roleAccessModel->insert(['role_id' => $id, 'access_page_id' => $accessPageId]);
                    }
                }
                return $this->respond(['message' => 'Role berhasil diperbarui', 'data' => $data], 200);
            } else {
                return $this->fail('Gagal mengupdate role', 400);
            }
        } else {
            return $this->fail('Role tidak ditemukan', 404);
        }
    }

    public function delete($id = null)
    {
        // Now, delete the role from the 'user_role' table
        $userRoleModel = new UserRoleModel();
        $referensiCount = $userRoleModel->where('role_id', $id)->countAllResults();
        if ($referensiCount > 0) {
            // Kembalikan pesan kesalahan jika masih ada referensi
            return $this->fail("Tolong hapus data yang berelasi dengan Role ini terlebih dahulu.", 400);
        }

        $roleAccessModel = new RoleAccessModel();
        $deletedRows = $roleAccessModel->where('role_id', $id)->delete();

        // Then, delete the role from the 'roles' table
        $model = new RoleModel();
        $delete = $model->delete($id);

        if ($delete && $deletedRows !== null) {
            return $this->respondDeleted(['message' => 'Role berhasil dihapus', 'id' => $id]);
        } else {
            return $this->fail('Gagal menghapus role', 400);
        }
    }

    public function addPage($role_id = null, $access_page_id = null)
    {
        $model = new RoleAccessModel();
        $addPage = $model->insert(['role_id' => $role_id, 'access_page_id' => $access_page_id]);
    }

    public function removePage($role_id = null, $access_page_id = null)
    {
        $model = new RoleAccessModel();
        $removePage = $model->where('role_id', $role_id)->where('access_page_id', $access_page_id)->delete();
        if ($removePage) {
            return $this->respondCreated(['role_id' => $role_id, 'access_page_id' => $access_page_id]);
        } else {
            return $this->fail('Gagal menghapus page di dalam role', 400);
        }
    }
}
