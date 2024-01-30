<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\EmDataFile;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\EmDataFile>
 */
class EmDataFileFactory extends Factory
{
    protected $model = EmDataFile::class;

    public function definition(): array
    {
        $existingUserIds = User::pluck('user_id')->toArray();

        $em_raw_file_name = '';
        $em_raw_file_extension = '.dat';

        do {
            // Generate a unique word without extension
            $randomWord = Str::random(); // You can also use Faker to generate a random word

            // Append the extension
            $em_raw_file_name = $randomWord . $em_raw_file_extension;
        } while (EmDataFile::where('em_preprocess_file_name', $em_raw_file_name)->exists());

        $em_preprocess_file_name = '';
        $em_preprocess_file_extension = '.dat';

        do {
            // Generate a unique word without extension
            $randomWord = Str::random(); // You can also use Faker to generate a random word

            // Append the extension
            $em_preprocess_file_name = $randomWord . $em_preprocess_file_extension;
        } while (EmDataFile::where('em_preprocess_file_name', $em_preprocess_file_name)->exists());

        return [
            'em_raw_file_name' => $em_raw_file_name,
            'em_raw_file_visible_name' => $this->faker->sentence(3),
            'em_raw_cfile_hash' => $this->faker->sha256,
            'em_preprocess_file_name' => $em_preprocess_file_name,
            'em_raw_h5_file_size' => $this->faker->numberBetween(1000, 10000),
            'em_raw_h5_hash' => $this->faker->sha256,
            'device_name' => $this->faker->word,
            'center_frequency' => $this->faker->randomFloat(2, 1, 100),
            'sampling_rate' => $this->faker->randomFloat(2, 1000, 10000),
            'file_upload_timestamp' => $this->faker->optional()->dateTimeThisYear(),
            'preprocessing_file_creation_timestamp' => $this->faker->optional()->dateTimeThisYear(),
            'updated_at' => now(),
            'user_id' => $this->faker->randomElement($existingUserIds),
        ];
    }
}
