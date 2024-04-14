<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class LoginTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testLogin()
    {
        $userData = [
            'email' => 'walidlhaila@example.com', // Provide the email of the user you want to log in
            'password' => 'walid2024', // Provide the password of the user
        ];
        $response = $this->postJson('/api/login', $userData);

        $response->assertStatus(200);

        $response->assertJsonStructure(['message', 'token']);
    }
}
