<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AlterProvidersTableAddColumnAgreedAt extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('providers', function (Blueprint $table) {
            $table->dateTime('agreed_at')->nullable();
            $table->string('bank_name', 256)->nullable();
            $table->string('bank_shop_name', 256)->nullable();
            $table->string('bank_number', 256)->nullable();
            $table->string('bank_type_id', 256)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
