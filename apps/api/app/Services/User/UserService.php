<?php

namespace App\Services\User;

use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class UserService
{
    /**
     * Lấy danh sách người dùng, phân trang mặc định 10 records
     */
    public function getPaginatedUsers($perPage = 10): LengthAwarePaginator
    {
        return User::latest()->paginate($perPage);
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
