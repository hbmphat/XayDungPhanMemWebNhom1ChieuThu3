<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Role;
use App\Models\Permission;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Tạo các quyền cơ bản
        $p1 = Permission::create(['name' => 'view_users']);
        $p2 = Permission::create(['name' => 'create_users']);
        $p3 = Permission::create(['name' => 'edit_users']);
        $p4 = Permission::create(['name' => 'delete_users']);

        // 2. Tạo Role Admin và gán full quyền
        $adminRole = Role::create(['name' => 'Admin']);
        $adminRole->permissions()->attach([$p1->id, $p2->id, $p3->id, $p4->id]);

        // 3. Tạo Role Staff và chỉ cho quyền xem
        $staffRole = Role::create(['name' => 'Staff']);
        $staffRole->permissions()->attach([$p1->id]);

        // 4. Tạo tài khoản Admin mẫu
        $admin = User::create([
            'user_name' => 'admin_demo',
            'first_name' => 'Quân',
            'last_name' => 'Admin',
            'email' => 'admin@gmail.com',
            'password' => Hash::make('123456'),
            'status' => 'active'
        ]);
        $admin->roles()->attach($adminRole->id);

        // 5. Tạo tài khoản Staff mẫu
        $staff = User::create([
            'user_name' => 'staff_demo',
            'first_name' => 'Nhân viên',
            'last_name' => 'Cấp dưới',
            'email' => 'staff@gmail.com',
            'password' => Hash::make('123456'),
            'status' => 'active'
        ]);
        $staff->roles()->attach($staffRole->id);
    }
}