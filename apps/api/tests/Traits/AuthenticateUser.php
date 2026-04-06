<?php

namespace Tests\Traits;

use App\Models\User;

trait AuthenticateUser
{
    /**
     * Giả lập đăng nhập với quyền Admin
     */
    protected function actingAsAdmin(): User
    {
        /** @var User $user */
        $user = User::factory()->create(['role' => 'admin']);
        $this->actingAs($user, 'api');

        return $user;
    }

    /**
     * Giả lập đăng nhập với quyền Customer
     */
    protected function actingAsCustomer(): User
    {
        /** @var User $user */
        $user = User::factory()->create(['role' => 'customer']);
        $this->actingAs($user, 'api');

        return $user;
    }
}
