<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class RolesMigration extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'id' => [
                'type'           => 'INT',
                'constraint'     => 11,
                'unsigned'       => true,
                'auto_increment' => true,
            ],
            'role_name' => [
                'type'       => 'VARCHAR',
                'constraint' => 255,
                'null'       => false,
                'unique'      => true,
            ],
            'access_page' => [
                'type'       => 'VARCHAR',
                'constraint' => 255,
                'null'       => false,
                'unique'     => true,
            ],
             'created_at' => [
                'type'       => 'DATETIME',
                'null' => 'true',
            ],
             'updated_at' => [
                'type'       => 'DATETIME',
                'null' => 'true',
            ],
        ]);

        $this->forge->addPrimaryKey('id');
        $this->forge->createTable('roles');
    }

    public function down()
    {
        $this->forge->dropTable('roles');
    }
}
