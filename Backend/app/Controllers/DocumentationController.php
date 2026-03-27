<?php

namespace App\Controllers;

use App\Models\DocumentationModel;
use App\Models\TypeModel;
use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\HTTP\ResponseInterface;

class DocumentationController extends ResourceController
{


    public function createDocumentation($cooperationId)
    {
        // Validation rules

        $rules = [
            'name' => 'required',
            'title' => 'required',
            'type' => 'required',
            'file_image' => 'uploaded[file_image]|max_size[file_image,5000]|is_image[file_image]'
        ];

        if (!$this->validate($rules)) {
            return $this->failValidationErrors($this->validator->getErrors());
        }
        // Handle file upload
        $file = $this->request->getFile('file_image');
        if ($file->isValid() && !$file->hasMoved()) {
            $newName = $file->getRandomName();
            $file->move('uploads', $newName);
        } else {
            return $this->failValidationErrors(['file_image' => 'Failed to upload file']);
        }


        // Insert documentation data
        $documentationModel = new DocumentationModel();
        $data = [
            'id_cooperation' => $cooperationId,
            'name' => $this->request->getVar('name'),
            'title' => $this->request->getVar('title'),
            'id_type' => $this->request->getVar('type'),
            'file_image' => $file->getName() // Save the filename in the database
        ];

        $documentationModel->insert($data);

        // Return success response
        return $this->respondCreated(['message' => 'Documentation created successfully']);
    }

    public function updateDocumentation($id, $cooperationId)
    {
        // Validation rules
        $rules = [
            'name' => 'required',
            'title' => 'required',
            'type' => 'required'
        ];

        // Ensure correct form data is sent
        if (!$this->validate($rules)) {
            return $this->failValidationErrors($this->validator->getErrors());
        }

        // Check if the documentation exists
        $documentationModel = new DocumentationModel();
        $documentation = $documentationModel->find($id);
        if (!$documentation) {
            return $this->failNotFound('Documentation not found');
        }

        // Handle file upload if there's a new file
        $file = $this->request->getFile('file_image');
        if ($file && $file->isValid() && !$file->hasMoved()) {
            // Delete previous image if exists
            $previousImage = 'uploads/' . $documentation['file_image'];
            if (file_exists($previousImage)) {
                unlink($previousImage);
            }
            // Move and save the new image
            $newName = $file->getRandomName();
            $file->move('uploads', $newName);
            $documentation['file_image'] = $newName;
        }

        // Update documentation data
        $updateData = [
            'id_cooperation' => $cooperationId,
            'name' => $this->request->getVar('name'),
            'title' => $this->request->getVar('title'),
            'id_type' => $this->request->getVar('type'),
            'file_image' => $documentation['file_image']
        ];

        // Save the updated documentation
        $documentationModel->update($id, $updateData);

        // Return success response
        return $this->respondUpdated(['message' => 'Documentation updated successfully']);
    }
    public function deleteDocumentation($id)
    {
        // Check if the documentation exists
        $documentationModel = new DocumentationModel();
        $documentation = $documentationModel->find($id);
        if (!$documentation) {
            return $this->failNotFound('Documentation not found');
        }

        // Delete the file from the uploads directory
        $filePath = 'uploads/' . $documentation['file_image'];
        if (file_exists($filePath)) {
            unlink($filePath); // Delete the file
        }

        // Delete the documentation from the database
        $documentationModel->delete($id);

        // Return success response
        return $this->respondDeleted(['message' => 'Documentation deleted successfully']);
    }
}
