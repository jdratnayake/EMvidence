<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */

    public function run(): void
    {
        // Define dummy data
        $users = [
            [
                'user_type' => 'investigator',
                'account_status' => 'verified',
                'ban_status' => 'false',
                'first_name' => 'Keaton',
                'last_name' => 'Dickens',
                'email' => 'investigator@example.com',
                'password' => bcrypt('As@nk@Sir99'), // You might want to use hashed passwords
                'phone_number' => '+94710554474',
                'profile_picture' => 'default.svg',
                'account_creation_timestamp' => now(),
                'last_login_timestamp' => null,
                'updated_at' => now(),
            ],
            [
                'user_type' => 'admin',
                'account_status' => 'verified',
                'ban_status' => 'false',
                'first_name' => 'John',
                'last_name' => 'Doe',
                'email' => 'admin@example.com',
                'password' => bcrypt('As@nk@Sir99'), // You might want to use hashed passwords
                'phone_number' => '+94767633100',
                'profile_picture' => 'default.svg',
                'account_creation_timestamp' => now(),
                'last_login_timestamp' => null,
                'updated_at' => now(),
            ],
            [
                'user_type' => 'developer',
                'account_status' => 'verified',
                'ban_status' => 'false',
                'first_name' => 'Isac',
                'last_name' => 'Nader',
                'email' => 'developer@example.com',
                'password' => bcrypt('As@nk@Sir99'), // You might want to use hashed passwords
                'phone_number' => '+94704145651',
                'profile_picture' => 'default.svg',
                'account_creation_timestamp' => now(),
                'last_login_timestamp' => null,
                'updated_at' => now(),
            ],
        ];

        // Insert dummy data into the users table
        DB::table('users')->insert($users);
    }
}
