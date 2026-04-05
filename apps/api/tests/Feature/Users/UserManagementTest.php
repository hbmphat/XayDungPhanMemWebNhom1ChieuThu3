<?php

namespace Tests\Feature\Users;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserManagementTest extends TestCase
{
    public function test_it_can_create_a_user_with_valid_data()
    {
        // 1. Giả lập Admin thực hiện request
        $this->actingAsAdmin();

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
            'role'          => 'customer',
            'status'        => 'active',
        ];

        // 2. Thực thi Request
        $response = $this->postJson('/api/users', $userData);

        // 3. Tận dụng assertStandardResponse từ Base TestCase
        $this->assertStandardResponse($response, 201);

        // 4. Kiểm tra dữ liệu cụ thể
        $response->assertJsonPath('data.email', $email)
            ->assertJsonPath('data.full_name', 'First Last');

        $this->assertDatabaseHas('users', [
            'user_name' => 'test_user',
            'email'     => $email
        ]);
    }
    public function test_it_fails_to_create_user_with_duplicate_email()
    {
        $this->actingAsAdmin();

        User::factory()->create(['email' => 'duplicate@example.com']);

        $response = $this->postJson('/api/users', [
            'user_name' => 'new_user',
            'email'     => 'duplicate@example.com',
            'password'  => 'password123'
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['email']);
    }
    public function test_it_can_filter_users_by_role()
    {
        $this->actingAsAdmin();

        // Tạo data mẫu
        User::factory(2)->create(['role' => 'admin']);
        User::factory(3)->create(['role' => 'customer']);

        $response = $this->getJson('/api/users?role=admin');

        $response->assertStatus(200);

        $data = $response->json('data');
        foreach ($data as $user) {
            $this->assertEquals('admin', $user['role']);
        }
    }
    public function test_it_can_search_users_by_name()
    {
        $this->actingAsAdmin();

        User::factory()->create(['user_name' => 'tim_kiem_toi']);
        User::factory()->create(['user_name' => 'nguoi_khac']);

        $response = $this->getJson('/api/users?search=tim_kiem');

        $response->assertStatus(200)
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.user_name', 'tim_kiem_toi');
    }
    public function test_it_can_update_user_info()
    {
        $this->actingAsAdmin();

        $user = User::factory()->create(['first_name' => 'OldName']);

        $response = $this->putJson("/api/users/{$user->id}", [
            'first_name' => 'NewName',
            'last_name'  => 'Updated',
            'user_name'  => 'user_' . uniqid(),
            'email'      => 'email' . uniqid() . '@example.com',
            'role'       => 'admin',
            'status'     => 'active',
        ]);

        $response->assertStatus(200);
        $this->assertDatabaseHas('users', ['id' => $user->id, 'first_name' => 'NewName']);
    }

    public function test_it_can_delete_a_user()
    {
        $this->actingAsAdmin();

        $user = User::factory()->create();

        $response = $this->deleteJson("/api/users/{$user->id}");

        $response->assertStatus(200);
        $this->assertDatabaseMissing('users', ['id' => $user->id]);
    }
}
