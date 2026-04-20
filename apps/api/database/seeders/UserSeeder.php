<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::factory()->admin()->create([
            'user_name' => 'admin',
            'email' => 'admin@gmail.com',
            'first_name' => 'System',
            'last_name' => 'Admin',
        ]);
        User::factory(20)->create();
    }
}
