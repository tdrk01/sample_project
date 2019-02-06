<?php

use Illuminate\Database\Seeder;

use App\Models\Box;

class BoxSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Box::truncate();
        // Box::create([
        //     "id" => 1,
        //     "name" => "オタメシBOX",
        //     "description" => "初めての方はこちら！",
        //     "price" => 4980,
        //     "image_url" => "box/cardboard.png",
        //     "slug" => "otameshi",
        //     "priority" => 0
        // ]);

        Box::create([
            "id" => 1,
            "name" => "ドキドキばこ",
            "description" => "1番人気!高価なものが当たるかも！？",
            "price" => 9800,
            "image_url" => "box/dokidoki_box.png",
            "slug" => "dokidoki",
            "priority" => 1
        ]);

        // Box::create([
        //     "id" => 3,
        //     "name" => "プレミアBOX",
        //     "description" => "誕生日・結婚・出産の思い出に。",
        //     "price" => 13980,
        //     "image_url" => "box/cardboard.png",
        //     "slug" => "premium",
        //     "priority" => 2
        // ]);
    }
}
