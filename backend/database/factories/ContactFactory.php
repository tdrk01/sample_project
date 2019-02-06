<?php

use Faker\Generator as Faker;

use App\Models\Contact;

$factory->define(Contact::class, function (Faker $faker) {
    return [
        "email" => $faker->email,
        "description" => $faker->sentence
    ];
});
