<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\EmDataFile;
use App\Models\AnalysisPlugin;
use App\Models\Device;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(UserTableSeeder::class);
        $this->call(DeviceTableSeeder::class);
        $this->call(EmDataFileTableSeeder::class);
        $this->call(AnalysisPluginTableSeeder::class);

        User::factory()->count(6)->create();
        Device::factory()->count(6)->create();
        EmDataFile::factory()->count(6)->create();
        AnalysisPlugin::factory()->count(6)->create();
    }
}
