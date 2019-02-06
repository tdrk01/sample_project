<?php

namespace App\Services;

use Validator;
use Carbon\Carbon;

use App\Models\Purchase;

class SummaryService
{
    public function getTotalSales(){
        return (object)[
            "count" => Purchase::count(),
            "price" => Purchase::selectRaw("sum( boxes.price ) as sum_price")
                ->join('boxes', 'purchases.box_id', '=', 'boxes.id')
                ->first()->sum_price
        ];
    }

    public function getSalesByMonth(Carbon $date){
        $from = new Carbon($date->startOfMonth());
        $to = new Carbon($date->endOfMonth());
        return (object)[
            "count" => Purchase::whereBetween("drawn_at", [$from, $to])->count(),
            "price" => Purchase::selectRaw("sum( boxes.price ) as sum_price")
                ->whereBetween("drawn_at", [$from, $to])
                ->join('boxes', 'purchases.box_id', '=', 'boxes.id')
                ->first()->sum_price
        ];
    }


    public function getProviderTotalSales( $providerId ){
        return (object)[
            "count" => Purchase::selectRaw("purchases.id, contents.provider_id")->join("contents", "purchases.content_id", "=", "contents.id")->where("contents.provider_id", $providerId)->count(),
            "price" => Purchase::selectRaw("sum( contents.price ) as sum_price")
                ->join("contents", "purchases.content_id", "=", "contents.id")
                ->join('boxes', 'purchases.box_id', '=', 'boxes.id')
                ->where("contents.provider_id", $providerId)
                ->first()->sum_price
        ];
    }

    public function getProviderSalesByMonth( $providerId, Carbon $date){
        $from = new Carbon($date->startOfMonth());
        $to = new Carbon($date->endOfMonth());
        return (object)[
            "count" => Purchase::selectRaw("purchases.id, contents.provider_id")->join("contents", "purchases.content_id", "=", "contents.id")->where("contents.provider_id", $providerId)->whereBetween("drawn_at", [$from, $to])->count(),
            "price" => Purchase::selectRaw("sum( contents.price ) as sum_price")
                ->join("contents", "purchases.content_id", "=", "contents.id")
                ->join('boxes', 'purchases.box_id', '=', 'boxes.id')
                ->whereBetween("drawn_at", [$from, $to])
                ->where("contents.provider_id", $providerId)
                ->first()->sum_price
        ];
    }
}
