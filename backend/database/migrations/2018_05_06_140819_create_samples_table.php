<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSamplesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('samples', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();
            $table->string('title', 256)->nullable();
            $table->string('summary', 256)->nullable();
            $table->string('image_url', 256)->nullable();
            $table->unsignedInteger('is_rare')->default(0);
            $table->unsignedInteger('win_rate')->default(1);
            $table->string('follow_text', 256)->nullable();

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('samples');
    }
}
