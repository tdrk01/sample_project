<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AlterPromotionCodesTableAddColumnCampaignId extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('promotion_codes', function (Blueprint $table) {
            $table->dropColumn('campaign');
             
            $table->unsignedInteger('campaign_id')->nullable();
            $table->dateTime('expired_at')->nullable();

            $table->index('campaign_id', 'fk__promotion_codes__campaign_id_idx');
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
