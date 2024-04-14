<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        // Create 3 volunteers
        User::factory()->count(3)->create(['role' => 'volunteer']);

        // Create 3 organizers
        User::factory()->count(3)->create(['role' => 'organizer']);
    }
}
