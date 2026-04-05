<?php

namespace Tests\Feature\Users;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserManagementTest extends TestCase
{
    //Tự động chạy migration lại từ đầu (SQLite RAM) 
    use RefreshDatabase;
    public function test_it_can_create_a_user_with_valid_data()
    {
        // Input
        $email = 'test.user' . time() . '@example.com';
        $userData = [
            'user_name'     => 'test_user',
            'first_name'    => 'First',
            'last_name'     => 'Last',
            'email'         => $email,
            'phone'         => '0334567890',
            'password'      => 'password123',
            'date_of_birth' => '1990-01-01',
            'address'       => 'Ho Chi Minh City',
            'role' => 'customer',
            'status'   => 'active',
        ];

        // Thực thi Request
        $response = $this->postJson('/api/users', $userData);

        // Test contract
        $response->assertStatus(201)
            ->assertJsonStructure([
                'success',
                'message',
                'data' => [
                    'user_id',
                    'role',
                    'status',
                    'user_name',
                    'first_name',
                    'last_name',
                    'full_name',
                    'email',
                    'date_of_birth',
                    'address',
                    'phone',
                    'created_at',
                    'updated_at'
                ]
            ]);

        // Test Content
        $response->assertJsonPath('success', true)
            ->assertJsonPath('data.email', $email)
            ->assertJsonPath('data.full_name', 'First Last');

        // Test Persistence (chỉ check các field quan trọng)
        $this->assertDatabaseHas('users', [
            'user_name' => 'test_user',
            'email'     => $email,
            'phone'     => '0334567890'
        ]);
    }
}
