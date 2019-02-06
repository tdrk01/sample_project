<?php

use Illuminate\Database\Seeder;

use App\Models\Provider;

class ProviderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Provider::truncate();

        Provider::create([
            "company_name" => "なんとか株式会社",
            "address" => "東京都目黒区五本木2-49-20",
            "tel" => "08081668669",
            "email" => "yahagi1989@gmail.com",
            "password" => "welcome1"
        ]);
    }
}
