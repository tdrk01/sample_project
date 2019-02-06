<?php

return [
    'root' => env('APP_WEB_URL', 'http://localhost:3000'),
    'auth' => [
        "login" => env('APP_WEB_URL', 'http://localhost:3000')."/auth/login",
        "reset" => env('APP_WEB_URL', 'http://localhost:3000')."/auth/reset/{token}",
        "social" => env('APP_WEB_URL', 'http://localhost:3000')."/auth/social/{user}/{token}",
    ],
    'privacy' => env('APP_WEB_URL', 'http://localhost:3000')."/others/privacy",
    'term' => env('APP_WEB_URL', 'http://localhost:3000')."/others/term",
    "company" => env('APP_COMPANY_URL', 'https://tdrk-inc.co.jp'),
    'contact' => env('APP_WEB_URL', 'http://localhost:3000')."/others/contact",
    "items" => [
        "draw" => env('APP_WEB_URL', 'http://localhost:3000')."/items/{hash}/draw",
        "detail" => env('APP_WEB_URL', 'http://localhost:3000')."/items/{hash}/detail",
        "ticket" => env('APP_WEB_URL', 'http://localhost:3000')."/items/{hash}/ticket",
        "questionary" => env('APP_WEB_URL', 'http://localhost:3000')."/items/{hash}/questionary",
    ],
    "contents" => [
        "preview" => env('APP_WEB_URL', 'http://localhost:3000')."/contents/{hash}",
    ]
];