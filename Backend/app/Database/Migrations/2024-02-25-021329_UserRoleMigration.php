<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class UserRoleMigration extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'user_id' => [
                'type'       => 'INT',
                'constraint' => 11,
                'null'       => false,
            ],
            'role_id' => [
                'type'       => 'INT',
                'constraint' => 11,
                'null'       => false,
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

        $this->forge->createTable('user_role');
    }

    public function down()
    {
        $this->forge->dropTable('user_role');
    }
}
