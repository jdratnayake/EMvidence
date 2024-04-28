<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class EmDataFileTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $em_data_files = [
            [
                'em_raw_upload_status' => 'processed',
                'em_raw_file_name' => 'class_8_iphone4s_sms-app.cfile',
                'em_raw_file_visible_name' => 'Iphone 4s SMS EM data',
                'em_raw_cfile_hash' => Str::random(32),
                'em_preprocess_file_name' => 'class_8_iphone4s_sms-app.npy',
                'em_raw_cfile_file_size' => 5000000,
                'em_raw_h5_file_size' => 5000000,
                'em_raw_h5_hash' => Str::random(32),
                'center_frequency' => 50,
                'sampling_rate' => 500,
                'file_upload_timestamp' => now(),
                'preprocessing_file_creation_timestamp' => now(),
                'updated_at' => now(),
                'user_id' => 3,
                'device_id' => 4,
            ],
        ];

        // Insert dummy data into the em_data_files table
        DB::table('em_data_files')->insert($em_data_files);
    }
}
