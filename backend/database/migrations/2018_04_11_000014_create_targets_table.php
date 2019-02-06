<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTargetsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('targets', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();
            $table->unsignedInteger('condition_id')->nullable();
            $table->unsignedInteger('purchase_id')->nullable();

            $table->index('condition_id', 'fk__targes__condition_id_idx');
            $table->index('purchase_id', 'fk__targes__purchase_id_idx');
            
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
        Schema::dropIfExists('targes');
        Schema::enableForeignKeyConstraints();
    }
}
