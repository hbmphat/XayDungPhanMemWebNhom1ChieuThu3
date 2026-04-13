<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends Factory<User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $faker = $this->faker ?? \Faker\Factory::create();

        return [
            'id' => Str::uuid(),
            'user_name' => $faker->unique()->userName(),
            'email' => $faker->unique()->safeEmail(),
            'phone' => '0'.$faker->numberBetween(320000000, 999999999),
            'first_name' => $faker->firstName(),
            'last_name' => $faker->lastName(),
            'address' => $faker->address(),
            'date_of_birth' => $faker->dateTimeBetween('-40 years', '-18 years')->format('Y-m-d'),
            'password' => static::$password ??= Hash::make('password'),
            'role' => $faker->randomElement(['inventory_manager', 'moderator', 'customer', 'collaborator']),
            'status' => $faker->randomElement(['active', 'inactive', 'blocked', 'pending', 'pending_kyc', 'suspended', 'banned']),
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
