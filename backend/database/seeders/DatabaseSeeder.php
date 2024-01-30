<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\EmDataFile;
use App\Models\Investigation;
use App\Models\AnalysisPlugin;
use App\Models\AnalysisPluginRating;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // $this->call(UserTableSeeder::class);
        User::factory()->count(3)->create();
        EmDataFile::factory()->count(3)->create();
        Investigation::factory()->count(3)->create();
        AnalysisPlugin::factory()->count(3)->create();
        AnalysisPluginRating::factory()->count(3)->create();
    }
}
