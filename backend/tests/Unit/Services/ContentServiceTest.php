<?php

namespace Tests\Unit\Services;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

use Illuminate\Validation\ValidationException;
use App\Models\Content;
use App\Services\ContentService;

class ContentServiceTest extends TestCase
{
    use RefreshDatabase;

    public function setUp(){
        parent::setUp();
        $this->contentService = $this->app->make(ContentService::class);
    }

    /**
     * A basic test example.
     *
     * @return void
     */
    public function testSearch()
    {
        $contents = factory( Content::class, 3 )->states("all", "display")->create();
        
        $content = $contents[0];
        $results = $this->contentService->search([
            "box_id" => $content->box_id,
            "provider_id" => $content->provider_id,
            "content_category_id" => $content->content_category_id,
            "name" => $content->name,
        ]);

        $this->assertTrue( 1 == $results->count() );
        $this->assertTrue($content->id == $results->first()->id);
    }

    /**
     * A basic test example.
     *
     * @return void
     */
    public function testAdd()
    {
        $content = factory( Content::class )->states("all")->make();

        $content = $this->contentService->add( $content->toArray() );
        $this->assertDatabaseHas("contents", [
            "id" => $content->id,
            "win_rate" => 0
        ]);
    }

    public function testAddError()
    {
        $content = factory( Content::class )->states("all")->make();

        $params = $content->toArray();

        foreach ($params as $key => $value) {
            $addParam = $params;
            unset($addParam[$key]);
            try {
                $this->contentService->add($addParam);
                $this->assertTrue(false);
            } catch (ValidationException $e) {
                $this->assertTrue(true);
            }
        }
    }

    /**
     * A basic test example.
     *
     * @return void
     */
    public function testEdit()
    {
        $old = factory( Content::class )->states("all", "hash")->create();

        $new = factory( Content::class )->states("all")->make();
        $result = $this->contentService->edit( $old->id, $new->toArray() );

        $this->assertDatabaseHas("contents", [
            "id" => $result->id,
            "box_id" => $new->box_id,
            "summary" => $new->summary
        ]);
    }

    public function testDelete()
    {
        $content = factory( Content::class )->states("all", "hash")->create();
        $this->contentService->delete( $content->id );

        $this->assertSoftDeleted("contents", [
            "id" => $content->id,
        ]);
    }
}
