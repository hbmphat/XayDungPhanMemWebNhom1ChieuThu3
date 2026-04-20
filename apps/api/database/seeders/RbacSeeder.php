<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;

class RbacSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Roles
        $adminRole = Role::firstOrCreate(
            ['name' => 'admin'],
            ['description' => 'Quản trị hệ thống']
        );

        $customerRole = Role::firstOrCreate(
            ['name' => 'customer'],
            ['description' => 'Khách hàng']
        );

        // Permissions
        $permissions = [
            ['name' => 'admin.access', 'description' => 'Truy cập khu vực quản trị'],
            ['name' => 'user.view', 'description' => 'Xem danh sách user'],
            ['name' => 'user.create', 'description' => 'Tạo user'],
            ['name' => 'user.update', 'description' => 'Cập nhật user'],
            ['name' => 'user.delete', 'description' => 'Xóa user'],
            ['name' => 'role.view', 'description' => 'Xem role'],
            ['name' => 'role.create', 'description' => 'Tạo role'],
            ['name' => 'role.update', 'description' => 'Cập nhật role'],
            ['name' => 'role.delete', 'description' => 'Xóa role'],
            ['name' => 'permission.view', 'description' => 'Xem permission'],
            ['name' => 'permission.create', 'description' => 'Tạo permission'],
            ['name' => 'permission.update', 'description' => 'Cập nhật permission'],
            ['name' => 'permission.delete', 'description' => 'Xóa permission'],
        ];

        $permissionModels = [];
        foreach ($permissions as $permission) {
            $permissionModels[$permission['name']] = Permission::firstOrCreate(
                ['name' => $permission['name']],
                ['description' => $permission['description']]
            );
        }

        // Gán permission cho role admin
        $adminRole->permissions()->sync([
            $permissionModels['admin.access']->id,
            $permissionModels['user.view']->id,
            $permissionModels['user.create']->id,
            $permissionModels['user.update']->id,
            $permissionModels['user.delete']->id,
            $permissionModels['role.view']->id,
            $permissionModels['role.create']->id,
            $permissionModels['role.update']->id,
            $permissionModels['role.delete']->id,
            $permissionModels['permission.view']->id,
            $permissionModels['permission.create']->id,
            $permissionModels['permission.update']->id,
            $permissionModels['permission.delete']->id,
        ]);

        // Gán role customer mặc định không có quyền admin
        $customerRole->permissions()->sync([]);

        // Gán admin cho user test nếu tồn tại
        $adminUser = User::where('email', 'test@gmail.com')->first();

        if ($adminUser) {
            $adminUser->roles()->syncWithoutDetaching([$adminRole->id]);
        }
    }
}