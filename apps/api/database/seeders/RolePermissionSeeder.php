<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = Role::where('name', 'Admin')->first();
        $staff = Role::where('name', 'Staff')->first();

        $allPermissions = Permission::pluck('id');

        // Admin có tất cả quyền
        $admin->permissions()->sync($allPermissions);

        // Staff chỉ có quyền view
        $staff->permissions()->sync(
            Permission::where('name', 'view_users')->pluck('id')
        );
    }
}
