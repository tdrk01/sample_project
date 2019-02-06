<?php

use Illuminate\Database\Seeder;

use App\Models\Condition;
use App\Models\ConditionCategory;

class ConditionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Condition::truncate();

        $category = ConditionCategory::where("label", "利用シーン")->first();
        Condition::create([
            "condition_category_id" => $category->id,
            "label" => "お祝い・記念品"
        ]);
        Condition::create([
            "condition_category_id" => $category->id,
            "label" => "自分で遊ぶ"
        ]);
        Condition::create([
            "condition_category_id" => $category->id,
            "label" => "2人以上で体験できるもの"
        ]);
        Condition::create([
            "condition_category_id" => $category->id,
            "label" => "3人以上で体験できるもの"
        ]);
        Condition::create([
            "condition_category_id" => $category->id,
            "label" => "その他"
        ]);
        

        $category = ConditionCategory::where("label", "年齢")->first();
        Condition::create([
            "condition_category_id" => $category->id,
            "label" => "小学生"
        ]);
        Condition::create([
            "condition_category_id" => $category->id,
            "label" => "中高校生"
        ]);
        Condition::create([
            "condition_category_id" => $category->id,
            "label" => "大学生"
        ]);
        Condition::create([
            "condition_category_id" => $category->id,
            "label" => "20~30代"
        ]);
        Condition::create([
            "condition_category_id" => $category->id,
            "label" => "40~50代"
        ]);
        Condition::create([
            "condition_category_id" => $category->id,
            "label" => "60代~"
        ]);


        $category = ConditionCategory::where("label", "性別")->first();
        Condition::create([
            "condition_category_id" => $category->id,
            "label" => "男性"
        ]);
        Condition::create([
            "condition_category_id" => $category->id,
            "label" => "女性"
        ]);
    }
}
