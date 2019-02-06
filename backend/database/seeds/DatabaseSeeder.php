<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call(BoxSeeder::class);
        $this->call(ConditionCategorySeeder::class);
        $this->call(ConditionSeeder::class);
        $this->call(ContentCategorySeeder::class);
        $this->call(ProviderSeeder::class);
        $this->call(ContentSeeder::class);
        // $this->call(PromotionCodeSeeder::class);
        // $this->call(QuestionSeeder::class);
        $this->call(AdminSeeder::class);
    }
}
