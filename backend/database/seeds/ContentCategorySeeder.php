<?php

use Illuminate\Database\Seeder;

use App\Models\ContentCategory;

class ContentCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        ContentCategory::truncate();

        ContentCategory::create([
            "label" => "アウトドア・スポーツ"
        ]);
        ContentCategory::create([
            "label" => "インドア"
        ]);
        ContentCategory::create([
            "label" => "習い事"
        ]);
        ContentCategory::create([
            "label" => "新感覚"
        ]);
    }
}
