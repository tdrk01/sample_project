<?php

use Faker\Generator as Faker;

use Illuminate\Support\Facades\Storage;
use Illuminate\Http\File;
use Illuminate\Http\UploadedFile;
use App\Models\Box;

$factory->define(Box::class, function (Faker $faker) {
    return [
        "name" => $faker->word,
        "description" => $faker->sentence,
        "price" => $faker->randomDigitNotNull,
        "image_url" => function(){
            $file = UploadedFile::fake()->image('text.png', 2048, 2048);
            return Storage::putFile('image', $file);
        },
        "slug" => str_random(10),
        "priority" => $faker->randomDigitNotNull,
    ];
});
