<?php

use Illuminate\Database\Seeder;

use App\Models\Question;

class QuestionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Question::truncate();

        Question::create([
            "sentence" => "プレゼントいただいた方へのメッセージをご記載ください",
            "priority" => 1
        ]);

        Question::create([
            "sentence" => "当選したコンテンツに関して何かご懸念点等あればお教えください。",
            "priority" => 2
        ]);

        Question::create([
            "sentence" => "tamatebacoのサービスについてご不満な点があればお教えください",
            "priority" => 3
        ]);

        Question::create([
            "sentence" => "その他何かあればご記載ください",
            "priority" => 4
        ]);
    }
}
