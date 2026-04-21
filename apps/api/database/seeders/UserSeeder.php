<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $adminRole = Role::where('name', 'Admin')->first();
        $customerRole = Role::where('name', 'Customer')->first();

        // Admin
        $admin = User::factory()->create([
            'user_name' => 'admin',
            'email' => 'admin@gmail.com',
            'first_name' => 'System',
            'last_name' => 'Admin',
            'status' => 'active',
        ]);

        if ($adminRole) {
            $admin->roles()->attach($adminRole->id);
        }

        // Users thường
        User::factory(20)->create()->each(function ($user) use ($customerRole) {
            $user->roles()->attach($customerRole->id);
        });
    }
}
