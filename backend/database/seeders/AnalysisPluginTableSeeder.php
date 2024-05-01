<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AnalysisPluginTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $analysis_plugins = [
            [
                'plugin_name' => 'Iphone 4s anomaly detection',
                'plugin_script_filename' => 'apple_iphone_4s__detect_anomalies.py',
                'ml_model_filename' => 'apple_iphone_4s__detect_anomalies__neural_network_model.h5',
                'plugin_description' => 'Sample Description',
                'plugin_upload_timestamp' => now(),
                'compatibility_status' => 'compatible',
                'number_of_usage_times' => 10,
                'updated_at' => now(),
                'user_id' => 3,
                'device_id' => 4,
                'compatibility_check_admin_id' => null,
                'em_file_id' => 1,
                'sampling_rate' => 500,
                'center_frequency' => 50,
                'fft_size' => 2048,
                'icon_filename' => 'anomaly.png',
                'dependency_filename' => 'anomaly.txt',
            ],
            [
                'plugin_name' => 'Iphone 4s behaviour detection',
                'plugin_script_filename' => 'apple_iphone_4s__detect_behaviour_of_6_classes.py',
                'ml_model_filename' => 'apple_iphone_4s__detect_behaviour_of_6_classes__neural_network_model.h5',
                'plugin_description' => 'Sample Description',
                'plugin_upload_timestamp' => now(),
                'compatibility_status' => 'compatible',
                'number_of_usage_times' => 10,
                'updated_at' => now(),
                'user_id' => 3,
                'device_id' => 4,
                'compatibility_check_admin_id' => null,
                'em_file_id' => 1,
                'sampling_rate' => 500,
                'center_frequency' => 50,
                'fft_size' => 2048,
                'icon_filename' => 'behavior.png',
                'dependency_filename' => 'behavior.txt',
            ],
        ];

        // Insert dummy data into the analysis_plugins table
        DB::table('analysis_plugins')->insert($analysis_plugins);
    }
}
