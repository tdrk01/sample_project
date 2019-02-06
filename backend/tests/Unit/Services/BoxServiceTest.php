<?php

namespace Tests\Unit\Services;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

use App\Services\BoxService;
use App\Models\Box;
use App\Models\Content;

class BoxServiceTest extends TestCase
{
    use RefreshDatabase;

    public function setUp(){
        parent::setUp();

        $this->boxService = $this->app->make(BoxService::class);
    }

    /**
     * A basic test example.
     *
     * @return void
     */
    public function testGetAll()
    {
        $boxes = factory(Box::class, 2)->create()
            ->each(function ($u) {
                $u->contents()->save(factory(Content::class)->make());
                $u->contents()->save(factory(Content::class)->make());
            });
        $results = $this->boxService->getAll();

        $this->assertTrue( $boxes->count() == $results->count() );
        $boxes->each( function($box, $index) use ($results) {
            $this->assertTrue($box->id == $results[$index]->id);
            $this->assertTrue( $box->contents->count() == $results[$index]->contents_count );
        });
    }

    /**
     * A basic test example.
     *
     * @return void
     */
    public function testGetSum()
    {
        $box = factory(Box::class, 1)->create()
            ->each(function ($u) {
                $u->contents()->save(factory(Content::class)->make());
                $u->contents()->save(factory(Content::class)->make());
            });

        $result = $this->boxService->getSum( $box[0]->id );
        $win = $box[0]->contents->reduce( function($carry, $content){
            return $content->win_rate + $carry;
        }, 0);
        
        $this->assertTrue( $result == $win );

    }
}
