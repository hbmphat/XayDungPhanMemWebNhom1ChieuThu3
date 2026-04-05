<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::factory()->create([
            'user_name' => 'admin',
            'email' => 'admin@gmail.com',
            'first_name' => 'System',
            'last_name' => 'Admin',
            'role' => 'admin',
            'status' => 'active',
        ]);
        User::factory(50)->create();
    }
}
