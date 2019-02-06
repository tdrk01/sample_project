<?php

use Illuminate\Database\Seeder;

use App\Models\ContentCategory;
use App\Models\Content;
use App\Models\Box;
use App\Models\Provider;
use Illuminate\Support\Str;

class ContentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Content::truncate();

        $provider = Provider::first();
        $box = Box::where("slug", "dokidoki")->first();

        $category = ContentCategory::where("label", "アウトドア・スポーツ")->first();
        Content::create([
            "title" => "起きてびっくりおかしなカヌー！！",
            "name" => "カヌー",
            "number" => "1人分",
            "email" => "test@test.com",
            "summary" => "アトラクションのサマリ",
            "description" => "ここにアトラクションの詳細が入ります。ここにアトラクションの詳細が入ります。\nここにアトラクションの詳細が入ります。ここにアトラクションの詳細が入ります。ここにアトラクションの詳細が入ります。\n\nここにアトラクションの詳細が入ります。ここにアトラクションの詳細が入ります。ここにアトラクションの詳細が入ります。ここにアトラクションの詳細が入ります。ここにアトラクションの詳細が入ります。\n\n\nここにアトラクションの詳細が入ります。",
            "reserve_way" => "下記の電話番号に連絡してください。\n080-8166-8669",
            "length" => "約1時間半",
            "tools" => "運動靴 長ズボン",
            "tel" => "080888888888",
            "link_url" => "http://www.chotto-yacht.com/school/kayak/",
            "address" => "神奈川県藤沢市片瀬海岸1-12-4",
            "access" => "高速道路出入り口から車で約15分\nその他高速バスあり",

            "price" => 4600,
            "box_id" => $box->id,
            "content_category_id" => $category->id,
            "display_priority" => 2,
            "win_rate" => 3,
            "reserve_type" => Content::DO_SELF,
            "provider_id" => $provider->id,
            "hash" => Str::random(64)
        ]);

        Content::create([
            "title" => "断崖絶壁！激ムズボルダリング！！",
            "name" => "ボルダリング",
            "number" => "ペアチケット",
            "email" => "test@test.com",
            "summary" => "アトラクションのサマリ",
            "description" => "ここにアトラクションの詳細が入ります。ここにアトラクションの詳細が入ります。\nここにアトラクションの詳細が入ります。ここにアトラクションの詳細が入ります。ここにアトラクションの詳細が入ります。\n\nここにアトラクションの詳細が入ります。ここにアトラクションの詳細が入ります。ここにアトラクションの詳細が入ります。ここにアトラクションの詳細が入ります。ここにアトラクションの詳細が入ります。\n\n\nここにアトラクションの詳細が入ります。",
            "reserve_way" => "下記の電話番号に連絡してください。\n080-8166-8669",
            "length" => "約1時間半",
            "tools" => "運動靴 長ズボン",
            "tel" => "080888888888",
            "access" => "高速道路出入り口から車で約15分\nその他高速バスあり",
            "link_url" => "https://boulcom.jp",
            "address" => "東京都渋谷区千駄ヶ谷5-29-7　地下1Ｆ",


            "price" => 1500,
            "box_id" => $box->id,
            "content_category_id" => $category->id,
            "display_priority" => 3,
            "win_rate" => 2,
            "reserve_type" => Content::SEND,
            "provider_id" => $provider->id,
            "hash" => Str::random(64)
        ]);

        $category = ContentCategory::where("label", "インドア")->first();
        Content::create([
            "title" => "あの有名な劇団もどきが東京にやってくる！！？",
            "name" => "演劇鑑賞",
            "number" => "ペアチケット",
            "email" => "test@test.com",
            "summary" => "アトラクションのサマリ",
            "description" => "ここにアトラクションの詳細が入ります。ここにアトラクションの詳細が入ります。\nここにアトラクションの詳細が入ります。ここにアトラクションの詳細が入ります。ここにアトラクションの詳細が入ります。\n\nここにアトラクションの詳細が入ります。ここにアトラクションの詳細が入ります。ここにアトラクションの詳細が入ります。ここにアトラクションの詳細が入ります。ここにアトラクションの詳細が入ります。\n\n\nここにアトラクションの詳細が入ります。",
            "reserve_way" => "下記の電話番号に連絡してください。\n080-8166-8669",
            "length" => "約1時間半",
            "tools" => "運動靴 長ズボン",
            "tel" => "080888888888",
            "access" => "高速道路出入り口から車で約15分\nその他高速バスあり",
            "link_url" => "https://www.shiki.jp",
            "address" => "東京都・大阪など",
            "price" => 6000,
            "box_id" => $box->id,
            "content_category_id" => $category->id,
            "display_priority" => 1,
            "win_rate" => 0.5,
            "reserve_type" => Content::BY_TODOROKI,
            "provider_id" => $provider->id,
            "hash" => Str::random(64)
        ]);
    }
}
