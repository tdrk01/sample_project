<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

use App\Services\SummaryService;
use App\Models\Admin;
use Carbon\Carbon;

class IndexController extends Controller
{
    protected $summaryService;

    public function __construct(SummaryService $summaryService){
        $this->middleware('auth:admin');
        $this->summaryService = $summaryService;
    }

    public function view(){
        $total = $this->summaryService->getTotalSales();
        $today = $this->summaryService->getSalesByMonth( Carbon::now() );
        return view("admin.view", [
            "total" => $total,
            "today" => $today
        ]);
    }
}
