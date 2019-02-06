<?php

use Faker\Generator as Faker;
use App\Models\ContentCategory;

$factory->define(ContentCategory::class, function (Faker $faker) {
    return [
        "label" => $faker->word
    ];
});
