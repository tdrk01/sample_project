<?php

namespace Tests\Unit\Services;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

use Laravel\Passport\Token;
use App\Services\OauthService;
use Carbon\Carbon;

class OauthServiceTest extends TestCase
{
    use RefreshDatabase;

    public function setUp(){
        parent::setUp();

        $this->oauthService = $this->app->make(OauthService::class);
    }
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testRevokeToken()
    {
        $token = Token::create([
            "id" => str_random(10),
            "user_id" => 1,
            "client_id" => 1,
            "created_at" => Carbon::now()->subDays(3),
            "revoked" => 0
        ]);
        $this->oauthService->revokeToken( $token->user_id );

        $this->assertDatabaseMissing("oauth_access_tokens", [
            "id" => $token->id
        ]);
    }

    public function testRevokeTokenNotRevoked()
    {
        $token = Token::create([
            "id" => str_random(10),
            "user_id" => 1,
            "client_id" => 1,
            "created_at" => Carbon::now()->subDays(1),
            "revoked" => 0
        ]);
        $this->oauthService->revokeToken( $token->user_id );

        $this->assertDatabaseHas("oauth_access_tokens", [
            "id" => $token->id
        ]);
    }

    public function testRevokeTokenNotRevokedOthers()
    {
        $token = Token::create([
            "id" => str_random(10),
            "user_id" => 2,
            "client_id" => 1,
            "created_at" => Carbon::now()->subDays(3),
            "revoked" => 0
        ]);
        $this->oauthService->revokeToken( 1 );

        $this->assertDatabaseHas("oauth_access_tokens", [
            "id" => $token->id
        ]);
    }
}
