<?php

namespace Database\Factories;

use App\Models\AnalysisPlugin;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\AnalysisPlugin>
 */
class AnalysisPluginFactory extends Factory
{
    protected $model = AnalysisPlugin::class;
    
    public function definition(): array
    {
        $existingUserIds = User::pluck('user_id')->toArray();
        $existingAdminIds = User::where('user_type', 'admin')->pluck('user_id')->toArray();

        $plugin_filename = '';
        $plugin_extension = '.dat';

        do {
            // Generate a unique word without extension
            $randomWord = Str::random(); // You can also use Faker to generate a random word

            // Append the extension
            $plugin_filename = $randomWord . $plugin_extension;
        } while (AnalysisPlugin::where('plugin_filename', $plugin_filename)->exists());

        return [
            'plugin_name' => $this->faker->unique()->word,
            'plugin_filename' => $plugin_filename,
            'machine_learning_model_name' => $this->faker->word,
            'analysis_plugin_dependency_name' => $this->faker->sentence(5),
            'plugin_upload_timestamp' => $this->faker->dateTimeThisYear(),
            'compatibility_status' => $this->faker->randomElement(['initial', 'compatible', 'incompatible']),
            'plugin_compatibility_verified_timestamp' => $this->faker->optional()->dateTimeThisYear(),
            'plugin_file_validation_status' => $this->faker->randomElement(['initial', 'compatible', 'incompatible']),
            'plugin_file_validation_verified_timestamp' => $this->faker->optional()->dateTimeThisYear(),
            'rating' => $this->faker->randomFloat(2, 0, 5),
            'number_of_usage_times' => $this->faker->numberBetween(0, 100),
            'updated_at' => now(),
            'user_id' => $this->faker->randomElement($existingUserIds),
            'compatibility_check_admin_id' => $this->faker->randomElement($existingAdminIds),
            'file_validation_verified_admin_id' => $this->faker->randomElement($existingAdminIds),
        ];
    }
}
