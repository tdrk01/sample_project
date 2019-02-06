<?php

namespace Tests\Unit\Services;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

use Illuminate\Support\Facades\Storage;
use Illuminate\Http\UploadedFile;

use App\Services\ContentImageService;
use App\Models\ContentImage;
use App\Models\Content;

class ContentImageServiceTest extends TestCase
{
    use RefreshDatabase;

    public function setUp(){
        parent::setUp();

        $this->contentImageService = $this->app->make(ContentImageService::class);
    }
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testAdd()
    {
        $content = factory( Content::class )->create();
        $file = UploadedFile::fake()->image('text.png', 2048, 2048);
        $image = $this->contentImageService->add(
            $content->id,
            $file
        );
        $this->assertDatabaseHas("content_images", [
            "id" => $image->id
        ]);
        Storage::assertExists( $image->image_url);
    }

    public function testDelete()
    {
        $content = factory( Content::class )->create();
        $file = UploadedFile::fake()->image('text.png', 2048, 2048);
        $image = $this->contentImageService->add(
            $content->id,
            $file
        );
        $this->assertTrue( $image->id != null);
        Storage::assertExists( $image->image_url);

        $this->contentImageService->delete(
            $image->id
        );
        Storage::assertMissing( $image->image_url );

        $this->assertDatabaseMissing("content_images", [
            "id" => $image->id
        ]);
    }
}
