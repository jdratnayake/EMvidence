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
        $existingUserIds = User::where('user_type', 'developer')->pluck('user_id')->toArray();
        $existingAdminIds = User::where('user_type', 'admin')->pluck('user_id')->toArray();

        $plugin_filename = '';
        $plugin_extension = '.py';

        do {
            // Generate a unique word without extension
            $randomWord = Str::random();

            // Append the extension
            $plugin_filename = $randomWord . $plugin_extension;
        } while (AnalysisPlugin::where('plugin_filename', $plugin_filename)->exists());

        $machine_learning_model_name = '';
        $machine_learning_model_extension = '.h5';

        do {
            // Generate a unique word without extension
            $randomWord = Str::random();

            // Append the extension
            $machine_learning_model_name = $randomWord . $machine_learning_model_extension;
        } while (AnalysisPlugin::where('machine_learning_model_name', $machine_learning_model_name)->exists());

        return [
            'plugin_name' => $this->faker->unique()->word,
            'plugin_filename' => $plugin_filename,
            'machine_learning_model_name' => $machine_learning_model_name,
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
