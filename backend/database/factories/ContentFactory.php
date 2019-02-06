<?php

use Faker\Generator as Faker;
use App\Models\Content;
use App\Models\Box;
use App\Models\Provider;
use App\Models\ContentCategory;

$factory->define(Content::class, function (Faker $faker) {
    return [
        "content_category_id" => function() {
            return factory(ContentCategory::class)->create()->id;
        },
        "name" => $faker->unique()->name,
        "title" => $faker->text,
        "price" => $faker->randomDigitNotNull,
        "summary" => $faker->sentence,
        "description" => $faker->password(100, 100),
        "link_url" => $faker->url,
        "address" => $faker->address,
    ];
});

$factory->state(Content::class, "hash", [
    "hash" => str_random(64),
]);

$factory->state(Content::class, "display", [
    "display_priority" => Content::SHOW,
]);

$factory->state(Content::class, "expirable", function (Faker $faker) {
    return [
        "expired_at" => $faker->dateTime,
        "expired_date" => $faker->randomDigitNotNull,
    ];
});

$factory->state(Content::class, "all", function (Faker $faker) {
    return  [
        "box_id" => function() {
            return factory(Box::class)->create()->id;
        },
        "provider_id" => function() {
            return factory(Provider::class)->create()->id;
        },
        "tel" => $faker->phoneNumber,
    ];
});
