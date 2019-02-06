<?php

use Illuminate\Database\Seeder;

use App\Models\ConditionCategory;

class ConditionCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        ConditionCategory::truncate();
        ConditionCategory::create([
            "id" => 1,
            "label" => "利用シーン",
            "question" => "ご利用の目的について教えてください",
            "priority" => 0
        ]);

        ConditionCategory::create([
            "id" => 2,
            "label" => "年齢",
            "question" => "ご利用される方(プレゼントであれば送る相手の方)の年齢を教えてください",
            "priority" => 1
        ]);

        ConditionCategory::create([
            "id" => 3,
            "label" => "性別",
            "question" => "ご利用される方(プレゼントであれば送る相手の方)の性別を教えてください",
            "priority" => 2
        ]);
    }
}
