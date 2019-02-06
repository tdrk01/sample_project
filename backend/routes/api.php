<?php

use Illuminate\Http\Request;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::prefix('/rest/v1')->namespace('Api')->group( function() {


    Route::post("/contacts", "ContactController@add");
    
    Route::prefix('/samples')->group(function () {
        Route::get("/draw", "SampleController@draw");
        Route::get("/{sample}", "SampleController@view");
    });

    Route::prefix('/boxes')->group(function () {
        Route::get("/", "BoxController@index")->name("api.boxes.index");
        Route::get("/{box}", "BoxController@view");
        Route::get("/{box}/sum", "BoxController@sum");
    });

    Route::prefix('/contents')->group(function () {
        Route::get("/", "ContentController@index");
        Route::get("/{content}", "ContentController@view");
    });

    Route::prefix('/condition_categories')->group(function () {
        Route::get("/", "ConditionCategoryController@index");
    });

    Route::prefix('/codes')->group(function () {
        Route::post("/check", "PromotionCodeController@check");
    });

    Route::prefix('/users')->group(function () {
        Route::post("/", "UserController@register");

        Route::post("/email", "UserController@email")->middleware(["throttle"]);
        Route::post("/login", "UserController@login")->middleware(["throttle"]);
        Route::post("/forget", "UserController@forget");
        Route::post("/reset", "UserController@reset");

        Route::get("/{user}", "UserController@view");
        Route::put("/{user}", "UserController@edit");
        Route::put("/{user}/password", "UserController@password");
        Route::delete("/{user}", "UserController@delete");

        Route::get("/{user}/purchases", "UserController@purchases");
    });
    
    Route::prefix('/purchases')->group(function () {
        Route::post("/", "PurchaseController@add");

        Route::prefix('/{purchase}')->group(function () {
            Route::get("/", "PurchaseController@view");
            Route::put("/", "PurchaseController@edit");
            Route::get("/detail", "PurchaseController@detail");

            Route::put("/draw", "PurchaseController@draw");
            Route::post("/use", "PurchaseController@use");
        });
    });
});
