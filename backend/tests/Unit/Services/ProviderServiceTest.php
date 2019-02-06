<?php

namespace Tests\Unit\Services;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use App\Services\ProviderService;
use App\Models\Provider;
use App\Models\Content;

class ProviderServiceTest extends TestCase
{
    use RefreshDatabase;

    public function setUp(){
        parent::setUp();

        $this->providerService = $this->app->make(ProviderService::class);
    }
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testGetAll()
    {
        $providers = factory(Provider::class, 3)->create();

        $results = $this->providerService->getAll();

        $this->assertTrue( $providers->count() == $results->count() );
        $providers->each( function($provider, $index) use ($results) {
            $this->assertTrue($provider->id == $results[$index]->id);
        });
    }

    public function testSearch()
    {
        $providers = factory( Provider::class, 3 )->create();
        
        $provider = $providers[0];
        $results = $this->providerService->search([
            "company_name" => $provider->company_name,
            "email" => $provider->email,
        ]);

        $this->assertTrue( 1 == $results->count() );
        $this->assertTrue($provider->id == $results->first()->id);
    }

    public function testAdd()
    {
        $provider = factory( Provider::class )->make();
        $provider = $this->providerService->add( $provider->toArray() );
        $this->assertDatabaseHas("providers", [
            "id" => $provider->id
        ]);
    }

    public function testAddError()
    {
        $provider = factory( Provider::class )->make();
        $params = $provider->toArray();
        foreach ($params as $key => $value) {
            $addParam = $params;
            unset($addParam[$key]);
            try {
                $this->providerService->add($addParam);
                $this->assertTrue(false);
            } catch (ValidationException $e) {
                $this->assertTrue(true);
            }
        }
    }

    public function testAgree()
    {
        $provider = factory( Provider::class )->create();
        $provider = $this->providerService->agree( $provider->id );
        $this->assertDatabaseHas("providers", [
            "id" => $provider->id,
            "agreed_at" => $provider->agreed_at
        ]);
    }

    public function testEdit()
    {
        $provider = factory( Provider::class )->create();
        $new = factory( Provider::class )->make();

        $provider = $this->providerService->edit( $provider->id, $new->toArray() );
         $this->assertDatabaseHas("providers", [
            "id" => $provider->id,
            "email" => $new->email
        ]);
    }

    public function testEditPassword()
    {
        $provider = factory( Provider::class )->create();
        $password = str_random(10);
        $provider = $this->providerService->editPassword( $provider->id, [
            "password" => $password
        ]);
         $this->assertTrue( Hash::check($password, $provider->password) );
    }

    public function testDelete()
    {
        $provider = factory( Provider::class)->create();
        $provider->each(function ($u) {
            $u->contents()->save(factory(Content::class)->make());
        });

        $this->providerService->delete( $provider->id );
        
        $this->assertSoftDeleted("providers", [
            "id" => $provider->id
        ]);

        $provider->contents->each( function($content) {
            $this->assertSoftDeleted("contents", [
                "id" => $content->id
            ]);
        });
    }
}
