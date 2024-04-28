<?php

namespace Database\Factories;

use App\Models\AnalysisPlugin;
use App\Models\EmDataFile;
use App\Models\User;
use App\Models\Device;
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
        $existingDeviceIds = Device::pluck('device_id')->toArray();
        $existingEmFileIds = EmDataFile::pluck('em_raw_file_id')->toArray();

        $plugin_script_filename = '';
        $plugin_extension = '.py';

        do {
            // Generate a unique word without extension
            $randomWord = Str::random();

            // Append the extension
            $plugin_script_filename = $randomWord . $plugin_extension;
        } while (AnalysisPlugin::where('plugin_script_filename', $plugin_script_filename)->exists());

        $ml_model_filename = '';
        $machine_learning_model_extension = '.h5';

        do {
            // Generate a unique word without extension
            $randomWord = Str::random();

            // Append the extension
            $ml_model_filename = $randomWord . $machine_learning_model_extension;
        } while (AnalysisPlugin::where('ml_model_filename', $ml_model_filename)->exists());

        $icon_filename = '';
        $icon_filename_extension = '.png';

        do {
            // Generate a unique word without extension
            $randomWord = Str::random();

            // Append the extension
            $icon_filename = $randomWord . $icon_filename_extension;
        } while (AnalysisPlugin::where('icon_filename', $icon_filename)->exists());

        $dependency_filename = '';
        $dependency_filename_extension = '.txt';

        do {
            // Generate a unique word without extension
            $randomWord = Str::random();

            // Append the extension
            $dependency_filename = $randomWord . $dependency_filename_extension;
        } while (AnalysisPlugin::where('dependency_filename', $dependency_filename)->exists());

        return [
            'plugin_name' => $this->faker->unique()->word,
            'plugin_script_filename' => $plugin_script_filename,
            'ml_model_filename' => $ml_model_filename,
            'icon_filename' => $icon_filename,
            'dependency_filename' => $dependency_filename,
            'plugin_description' => $this->faker->sentence(5),
            'plugin_upload_timestamp' => $this->faker->dateTimeThisYear(),
            'compatibility_status' => $this->faker->randomElement(['initial', 'pending', 'compatible', 'incompatible']),
            'plugin_compatibility_verified_timestamp' => $this->faker->optional()->dateTimeThisYear(),
            'number_of_usage_times' => $this->faker->numberBetween(0, 100),
            'fft_size' => $this->faker->numberBetween(0, 100),
            'center_frequency' => $this->faker->randomFloat(2, 1, 100),
            'sampling_rate' => $this->faker->randomFloat(2, 1000, 10000),
            'updated_at' => now(),
            'user_id' => $this->faker->randomElement($existingUserIds),
            'device_id' => $this->faker->randomElement($existingDeviceIds),
            'em_file_id' => $this->faker->randomElement($existingEmFileIds),
            'compatibility_check_admin_id' => $this->faker->randomElement($existingAdminIds),
        ];
    }
}
