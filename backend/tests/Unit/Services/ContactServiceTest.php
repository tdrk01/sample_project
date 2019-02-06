<?php

namespace Tests\Unit\Services;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Validation\ValidationException;

use App\Services\ContactService;
use App\Models\Contact;

class ContactServiceTest extends TestCase
{
    use RefreshDatabase;

    public function setUp(){
        parent::setUp();

        $this->contactService = $this->app->make(ContactService::class);
    }
    
    public function testAdd()
    {
        $contact = factory( Contact::class )->make();
        $result = $this->contactService->add($contact->toArray());
        $this->assertTrue( $result->id != null );

        $this->assertDatabaseHas("contacts", [
            "id" => $result->id
        ]);
    }

    public function testAddError()
    {
        $contact = factory( Contact::class )->make();
        $params = $contact->toArray();

        foreach ($params as $key => $value) {
            $addParam = $params;
            unset($addParam[$key]);
            try {
                $this->contactService->add($addParam);
                $this->assertTrue(false);
            } catch (ValidationException $e) {
                $this->assertTrue(true);
            }
        }

    }
}
