<?php

use Illuminate\Database\Seeder;

use App\Models\PromotionCode;
use App\Models\Box;
use Illuminate\Support\Str;

class PromotionCodeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        PromotionCode::truncate();

        $dokidoki = Box::where("slug", "dokidoki")->first();

        PromotionCode::create([
            "box_id" => $dokidoki->id,
            "campaign" => "test",
            "code" => Str::random(16),
            "price" => 3000
        ]);

        PromotionCode::create([
            "campaign" => "test",
            "code" => Str::random(16),
            "price" => 1000
        ]);

        PromotionCode::create([
            "box_id" => $dokidoki->id,
            "campaign" => "test",
            "code" => Str::random(16),
            "price" => 5000
        ]);
    }
}
