<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class RegistrationTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testRegister()
    {
        $userData = [
            'fname' => 'John',
            'lname' => 'Doe',
            'role' => 'organizer',
            'competance' => 'some competence',
            'email' => 'john@example.com',
            'password' => 'password',
        ];
        $response = $this->postJson('/api/register', $userData);

        $response->assertStatus(200);

        $response->assertJsonStructure(['message', 'token']);
    }
}
