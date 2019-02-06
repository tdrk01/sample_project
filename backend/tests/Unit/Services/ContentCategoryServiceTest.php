<?php

namespace Tests\Unit\Services;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

use App\Services\ContentCategoryService;
use App\Models\ContentCategory;

class ContentCategoryServiceTest extends TestCase
{
    use RefreshDatabase;

    public function setUp(){
        parent::setUp();

        $this->contentCategoryService = $this->app->make(ContentCategoryService::class);
    }
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testGetAll()
    {
        $contentCategories = factory(ContentCategory::class, 2)->create();
        $results = $this->contentCategoryService->getAll();

        $this->assertTrue( $contentCategories->count() == $results->count() );
        $contentCategories->each( function($contentCategory, $index) use ($results) {
            $this->assertTrue($contentCategory->id == $results[$index]->id);
        });
    }
}
