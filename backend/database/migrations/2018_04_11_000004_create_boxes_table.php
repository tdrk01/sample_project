<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

/**
 * Migration auto-generated by Sequel Pro Laravel Export (1.4.1)
 * @see https://github.com/cviebrock/sequel-pro-laravel-export
 */
class CreateBoxesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('boxes', function (Blueprint $table) {
            $table->increments('id');
            $table->dateTime('created_at')->nullable();
            $table->dateTime('updated_at')->nullable();
            $table->dateTime('deleted_at')->nullable();
            $table->string('name', 256)->nullable();
            $table->mediumText('description')->nullable();
            $table->unsignedInteger('price')->nullable()->default(0);
            $table->string('image_url', 256)->nullable();
            $table->string('slug', 64)->nullable();
            $table->unsignedInteger('priority')->default(0);

            $table->index('slug', 'boxes__slug_idx');

        });

        

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::disableForeignKeyConstraints();
        Schema::dropIfExists('boxes');
        Schema::enableForeignKeyConstraints();
    }
}
