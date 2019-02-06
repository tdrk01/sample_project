<?php

namespace App\Http\Controllers\Provider;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\PasswordConfirmRequest;
use App\Services\ProviderService;
use App\Services\SummaryService;

use Carbon\Carbon;

class IndexController extends Controller
{
    protected $providerService;
    protected $summaryService;

    public function __construct(SummaryService $summaryService,  ProviderService $providerService )
    {
        $this->middleware('auth:provider')->except(["term"]);
        $this->providerService = $providerService;
        $this->summaryService = $summaryService;
    }

    public function term(){
        return view("provider.term");
    }

    public function agree(){
        $this->providerService->agree(Auth::guard("provider")->id());
        return back();
    }

    public function view(){
        $provider = Auth::guard("provider")->user();
        $total = $this->summaryService->getProviderTotalSales( $provider->id );
        $today = $this->summaryService->getProviderSalesByMonth( $provider->id, Carbon::now() );
        return view("provider.view", [
            "provider" => $provider,
            "total" => $total,
            "today" => $today
        ]);
    }

    public function showEditForm(){
        return view("provider.edit", [
            "provider" => Auth::guard("provider")->user()
        ]);
    }

    public function edit( Request $request ){
        $this->providerService->edit( Auth::guard("provider")->id(), $request->all() );
        return back()->with('message', '更新しました');
    }

    public function editPassword( PasswordConfirmRequest $request ){
        $this->providerService->editPassword( Auth::guard("provider")->id(), $request->all() );
        return back()->with('message', '更新しました');
    }
}
