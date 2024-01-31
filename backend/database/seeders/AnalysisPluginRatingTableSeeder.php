<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AnalysisPluginRatingTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $ratings = [
            ['user_id' => 3, 'plugin_id' => 1, 'rating_score' => 4],
            ['user_id' => 3, 'plugin_id' => 2, 'rating_score' => 5],
        ];

        // Insert the ratings into the analysis_plugin_ratings table
        foreach ($ratings as $rating) {
            DB::table('analysis_plugin_ratings')->insert($rating);
        }
    }
}
