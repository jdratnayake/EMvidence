<?php

namespace Database\Factories;

use App\Models\AnalysisPluginRating;
use App\Models\User;
use App\Models\AnalysisPlugin;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\AnalysisPluginRating>
 */
class AnalysisPluginRatingFactory extends Factory
{
    protected $model = AnalysisPluginRating::class;

    public function definition(): array
    {
        $existingUserIds = User::pluck('user_id')->toArray();
        $existingPluginIds = AnalysisPlugin::pluck('plugin_id')->toArray();

        return [
            'user_id' => $this->faker->randomElement($existingUserIds),
            'plugin_id' => $this->faker->randomElement($existingPluginIds),
            'rating_score' => $this->faker->numberBetween(1, 5), // Generate a random rating score between 1 and 5
        ];
    }
}
