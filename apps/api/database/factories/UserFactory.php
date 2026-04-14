<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'id' => Str::uuid(),
            'user_name' => $this->faker->userName(),
            'email' => $this->faker->unique()->safeEmail(),
            'phone' => '0'.$this->faker->numberBetween(320000000, 999999999),
            'first_name' => $this->faker->firstName(),
            'last_name' => $this->faker->lastName(),
            'address' => $this->faker->address(),
            'date_of_birth' => $this->faker->dateTimeBetween('-40 years', '-18 years')->format('Y-m-d'),
            'password' => 'password',
            'role' => $this->faker->randomElement(['inventory_manager', 'moderator', 'customer', 'collaborator']),
            'status' => $this->faker->randomElement(['active', 'inactive', 'blocked', 'pending', 'pending_kyc', 'suspended', 'banned']),
            'remember_token' => Str::random(10),
        ];
    }

    public function admin(): static
    {
        return $this->state(fn (array $attributes) => [
            'role' => 'admin',
            'status' => 'active',
        ]);
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
