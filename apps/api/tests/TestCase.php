<?php

namespace Tests;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Tests\Traits\AuthenticateUser;

abstract class TestCase extends BaseTestCase
{
    use RefreshDatabase, AuthenticateUser;

    /**
     * Thiết lập môi trường test, tự động thêm header Accept: application/json để test API
     */
    protected function setUp(): void
    {
        parent::setUp();
        $this->withHeaders([
            'Accept' => 'application/json',
        ]);
    }
    /**
     * Kiểm tra cấu trúc Response chuẩn của dự án.
     */
    protected function assertStandardResponse($response, $statusCode = 200)
    {
        return $response->assertStatus($statusCode)
            ->assertJsonStructure([
                'success',
                'message',
                'data'
            ]);
    }
}
