<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class InvestigationTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $investigations = [
            [
                'title' => 'First investigation',
                'description' => 'Sample investigation description',
                'investigation_status' => 'initial',
                'investigation_creation_timestamp' => now(),
                'updated_at' => now(),
                'user_id' => 1,
            ],
        ];

        // Insert dummy data into the investigations table
        DB::table('investigations')->insert($investigations);
    }
}
