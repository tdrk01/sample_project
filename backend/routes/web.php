<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get("/", function() {
    return redirect()->away(config("web_url.root"));
})->name("root.index");

Route::get("/privacy", function() {
    return redirect()->away(config("web_url.privacy"));
})->name("root.privacy");

Route::get("/term", function() {
    return redirect()->away(config("web_url.term"));
})->name("root.term");

Route::get("/company", function() {
    return redirect()->away(config("web_url.company"));
})->name("root.company");

Route::get("/contact", function() {
    return redirect()->away(config("web_url.contact"));
})->name("root.contact");

Route::get('/storage', function() {
    abort(404);
})->name("storage");

Route::get('/storage/{dir}/{path}', "StorageController@index");

Route::get('/images/no-image.png')->name("noimage");
Route::get('/images/no-avatar.jpg')->name("noavatar");

Route::prefix('/users')->group(function () {
    Route::get("/login/{provider}", "SocialAccountController@redirectToProvider");
    Route::get("/login/{provider}/callback", "SocialAccountController@handleProviderCallback");
});


Route::prefix('/admin')->namespace('Admin')->group(function () {

    Route::get("/", "IndexController@view")->name("admin.view");

    Route::get("/login", "AuthController@showLoginForm")->name("admin.login");
    Route::post("/login", "AuthController@login");
    Route::get("/logout", "AuthController@logout")->name("admin.logout");


    Route::prefix('/providers')->group(function () {
        Route::get("/", "ProviderController@index")->name("admin.providers.index");
        Route::post("/add", "ProviderController@add")->name("admin.providers.add");
        Route::post("/{provider}/edit", "ProviderController@edit")->name("admin.providers.edit");
        Route::post("/{provider}/pass", "ProviderController@password")->name("admin.providers.pass");
        Route::post("/{provider}/delete", "ProviderController@delete")->name("admin.providers.delete");
    });

    Route::prefix('/contents')->group(function () {
        Route::get("/", "ContentController@index")->name("admin.contents.index");
        Route::post("/add", "ContentController@add")->name("admin.contents.add");
        Route::get("/{content}/edit", "ContentController@showEditForm")->name("admin.contents.edit");
        Route::post("/{content}/edit", "ContentController@edit");
        Route::post("/{content}/delete", "ContentController@delete")->name("admin.contents.delete");

        Route::prefix('/{content}/images')->group(function () {
            Route::post("/add", "ContentImageController@add")->name("admin.contentImages.add");
            Route::post("/{contentImage}/delete", "ContentImageController@delete")->name("admin.contentImages.delete");
        });
    });
});

Route::prefix('/provider')->namespace('Provider')->group(function () {

    Route::get("/", "IndexController@view")->name("provider.view");
    Route::get("/term", "IndexController@term")->name("provider.term");
    Route::post("/agree", "IndexController@agree")->name("provider.agree");
    
    Route::get("/edit", "IndexController@showEditForm")->name("provider.edit");
    Route::post("/edit", "IndexController@edit");
    Route::post("/pass", "IndexController@edit")->name("provider.pass");

    Route::get("/login", "AuthController@showLoginForm")->name("provider.login");
    Route::post("/login", "AuthController@login");
    Route::get("/logout", "AuthController@logout")->name("provider.logout");

    Route::prefix('/contents')->group(function () {
        Route::get("/", "ContentController@index")->name("provider.contents.index");
        Route::get("/{content}/edit", "ContentController@showEditForm")->name("provider.contents.edit");
        Route::post("/{content}/edit", "ContentController@edit");

        Route::prefix('/contents/{content}/images')->group(function () {
            Route::post("/add", "ContentImageController@add")->name("provider.contentImages.add");
            Route::post("/{contentImage}/delete", "ContentImageController@delete")->name("provider.contentImages.delete");
        });
    });
});