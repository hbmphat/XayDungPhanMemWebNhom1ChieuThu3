<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Models\Role;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, HasUuids, Notifiable;

    // Trường được phép chỉnh sửa
    protected $fillable = [
        'user_name',
        'role',
        'status',
        'first_name',
        'last_name',
        'password',
        'email',
        'date_of_birth',
        'address',
        'phone',
    ];

    // Trường đính kèm vào json response
    protected $appends = ['full_name'];

    // Trường bị ẩn khỏi json response
    protected $hidden = [
        'password',
    ];

    // Ép kiểu
    protected function casts(): array
    {
        return [
            'password' => 'hashed',
            'email_verified_at' => 'datetime',
            'date_of_birth' => 'date:d/m/Y',
        ];
    }

    // Tạo trường full_name
    protected function fullName(): Attribute
    {
        return Attribute::make(
            get: fn (mixed $value, array $attributes) => trim(($attributes['first_name'] ?? '') . ' ' . ($attributes['last_name'] ?? '')),
        );
    }

    /**
     * Quan hệ nhiều-nhiều giữa user và roles
     */
    public function roles()
    {
        return $this->belongsToMany(Role::class, 'user_role', 'user_id', 'role_id');
    }

    /**
     * Kiểm tra user có role cụ thể không
     */
    public function hasRole(string $roleName): bool
    {
        return $this->roles()->where('name', $roleName)->exists();
    }

    /**
     * Kiểm tra user có permission cụ thể không
     */
    public function hasPermission(string $permissionName): bool
    {
        return $this->roles()
            ->whereHas('permissions', function ($query) use ($permissionName) {
                $query->where('name', $permissionName);
            })
            ->exists();
    }
}