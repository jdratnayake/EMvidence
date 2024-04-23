<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    protected $model = User::class;

    public function definition()
    {
        return [
            'user_type' => $this->faker->randomElement(['admin', 'investigator', 'developer']),
            'account_status' => $this->faker->randomElement(['unverified', 'verified']),
            'ban_status' => $this->faker->randomElement(['false', 'true']),
            'first_name' => $this->faker->firstName,
            'last_name' => $this->faker->lastName,
            'email' => $this->faker->unique()->safeEmail,
            'password' => bcrypt('AsankaSir'),
            'phone_number' => $this->faker->phoneNumber,
            'profile_picture' => 'default.svg',
            'account_creation_timestamp' => now(),
            'last_login_timestamp' => $this->faker->dateTimeThisYear(),
            'updated_at' => now(),
        ];
    }
}
