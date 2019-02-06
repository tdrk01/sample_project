<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProvidersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('providers', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();
            $table->dateTime('deleted_at')->nullable();
            $table->string('email', 100)->nullable();
            $table->string('password', 256)->nullable();
            $table->string('remember_token', 256)->nullable();
            $table->string('company_name', 100)->nullable();
            $table->string('address', 100)->nullable();
            $table->string('tel', 100)->nullable();
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
        Schema::dropIfExists('providers');
        Schema::enableForeignKeyConstraints();
    }
}
