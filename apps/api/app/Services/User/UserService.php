<?php

namespace App\Services\User;

use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class UserService
{
    /**
     * Lấy danh sách người dùng, phân trang mặc định 10 records
     * Tìm kiếm theo tên, email, số điện thoại; lọc theo role, status 
     */
    public function getPaginatedUsers(int $perPage, array $filters = []): LengthAwarePaginator
    {
        return User::query()
            ->when(!empty($filters['search']), function ($query) use ($filters) {
                $search = $filters['search'];
                $query->where(function ($q) use ($search) {
                    $q->where('user_name', 'like', "%$search%")
                        ->orWhere('email', 'like', "%$search%")
                        ->orWhere('phone', 'like', "%$search%")
                        ->orWhere('first_name', 'like', "%{$search}%")
                        ->orWhere('last_name', 'like', "%{$search}%");
                });
            })
            ->when(!empty($filters['role']), function ($query) use ($filters) {})
            ->when(!empty($filters['status']), function ($query) use ($filters) {})
            ->latest()
            ->paginate($perPage);
    }

    /**
     * Lưu user mới
     */
    public function createUser(array $data): User
    {
        $user = User::create($data);
        return $user->refresh();
    }

    /**
     * Lấy thông tin người dùng chỉ định
     */
    public function getUser(User $user): User
    {
        return $user;
        // return $user->load('extraInfo');
    }
    /**
     * Cập nhật user
     */
    public function updateUser(array $data, User $user): User
    {
        if (empty($data['password'])) {
            unset($data['password']);
        }
        $user->update($data);
        return $user;
    }
    /**
     * Xóa user
     */
    public function deleteUser(User $user): bool
    {
        return $user->delete();
    }
}
