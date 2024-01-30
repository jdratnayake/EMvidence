<?php

namespace Database\Factories;

use App\Models\Investigation;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Investigation>
 */
class InvestigationFactory extends Factory
{
    protected $model = Investigation::class;

    public function definition(): array
    {
        $existingUserIds = User::pluck('user_id')->toArray();

        return [
            'description' => $this->faker->sentence,
            'investigation_status' => $this->faker->randomElement(['initial', 'in-progress', 'completed']),
            'investigation_creation_timestamp' => $this->faker->dateTimeThisYear(),
            'investigation_archived_timestamp' => $this->faker->optional()->dateTimeThisYear(),
            'updated_at' => now(),
            'user_id' => $this->faker->randomElement($existingUserIds),
        ];
    }
}
