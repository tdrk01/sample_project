<?php

use Faker\Generator as Faker;

use App\Models\Provider;

$factory->define(Provider::class, function (Faker $faker) {
    return [
        "email" => $faker->unique()->safeEmail,
        "company_name" => $faker->name,
        "address" => $faker->address,
    ];
});

$factory->state(Provider::class, "all", function (Faker $faker) {
    return [
        "password" => $faker->password,
    ];
});
