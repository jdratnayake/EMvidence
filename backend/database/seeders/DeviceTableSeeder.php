<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DeviceTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Define dummy data
        $devices = [
            [
                'device_name' => 'Arduino Uno',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'device_name' => 'Raspberry Pi 4',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'device_name' => 'Magicbit',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'device_name' => 'iPhone 4s',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ];

        // Insert dummy data into the users table
        DB::table('devices')->insert($devices);
    }
}
