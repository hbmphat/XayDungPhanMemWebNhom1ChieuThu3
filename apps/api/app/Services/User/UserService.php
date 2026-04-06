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
                $search = '%' . mb_strtolower(trim($filters['search'])) . '%';
                $query->where(function ($q) use ($search) {
                    $q->where('user_name', 'ILIKE', '%' . $search . '%')
                        ->orWhere('email', 'ILIKE', "%$search%")
                        ->orWhere('phone', 'ILIKE', "%$search%")
                        ->orWhere('first_name', 'ILIKE', "%{$search}%")
                        ->orWhere('last_name', 'ILIKE', "%{$search}%")
                        ->orWhere('address', 'ILIKE', "%{$search}%");
                });
            })
            ->when(isset($filters['role']) && $filters['role'] !== '', function ($q) use ($filters) {
                $q->where('role', $filters['role']);
            })
            ->when(isset($filters['status']) && $filters['status'] !== '', function ($q) use ($filters) {
                $q->where('status', $filters['status']);
            })
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
