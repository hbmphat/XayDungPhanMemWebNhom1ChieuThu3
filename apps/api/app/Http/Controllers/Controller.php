<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Traits\ApiResponser;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

abstract class Controller
{
    use ApiResponser, AuthorizesRequests, ValidatesRequests;
    // Số record mặc định trên mỗi trang
    protected int $perPage = 10;
    /**
     * Lấy số lượng bản ghi trên mỗi trang từ Request hoặc dùng mặc định
     */
    protected function getPerPage(): int
    {
        $perPage = request()->input('per_page', $this->perPage);
        // Giới hạn số record tối đa
        return (int) min($perPage, 50);
    }
    /**
     * Lấy User hiện tại đang đăng nhập (kèm Type-hinting)
     */
    protected function currentUser(): ?User
    {
        return Auth::user();
    }
    /**
     * Hàm trả về lỗi 403 nhanh 
     */
    protected function unauthorized($message = 'Không có quyền truy cập'): JsonResponse
    {
        return $this->errorResponse($message, 403);
    }
}
