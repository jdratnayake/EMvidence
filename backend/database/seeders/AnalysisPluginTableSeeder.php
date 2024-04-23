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
                'plugin_filename' => 'apple_iphone_4s__detect_anomalies.py',
                'machine_learning_model_name' => 'apple_iphone_4s__detect_anomalies__neural_network_model.h5',
                'analysis_plugin_dependency_name' => 'Sample Dependency',
                'plugin_upload_timestamp' => now(),
                'compatibility_status' => 'initial',
                'plugin_file_validation_status' => 'initial',
                'rating' => 3.5,
                'number_of_usage_times' => 10,
                'updated_at' => now(),
                'user_id' => 3,
                'device_id' => 4,
                'compatibility_check_admin_id' => null,
                'file_validation_verified_admin_id' => null,
            ],
            [
                'plugin_name' => 'Iphone 4s behaviour detection',
                'plugin_filename' => 'apple_iphone_4s__detect_behaviour_of_6_classes.py',
                'machine_learning_model_name' => 'apple_iphone_4s__detect_behaviour_of_6_classes__neural_network_model.h5',
                'analysis_plugin_dependency_name' => 'Sample Dependency',
                'plugin_upload_timestamp' => now(),
                'compatibility_status' => 'initial',
                'plugin_file_validation_status' => 'initial',
                'rating' => 3.5,
                'number_of_usage_times' => 10,
                'updated_at' => now(),
                'user_id' => 3,
                'device_id' => 4,
                'compatibility_check_admin_id' => null,
                'file_validation_verified_admin_id' => null,
            ],
        ];

        // Insert dummy data into the analysis_plugins table
        DB::table('analysis_plugins')->insert($analysis_plugins);
    }
}
