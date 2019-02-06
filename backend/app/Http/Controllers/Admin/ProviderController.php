<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\Services\ProviderService;
use App\Models\Provider;

class ProviderController extends Controller
{
    protected $providerService;

    public function __construct(ProviderService $providerService){
        $this->middleware('auth:admin');
        $this->providerService = $providerService;
    }

    public function index(Request $request){
        $providers = $this->providerService->search(
            $request->all(), 20, 
            $request->input("order", "created_at"), 
            $request->input("sort", "asc")
        );
        return view("admin.providers", [
            "providers" => $providers, 
            "params" => $request->all()
        ]);
    }

    public function add(Request $request){
        $this->providerService->add( $request->all() );
        return back()->with("message", "追加しました");
    }

    public function edit(Request $request, Provider $provider){
        $this->providerService->edit( $provider->id,  $request->all() );
        return back()->with("message", "編集しました");   
    }

    public function password(Request $request, Provider $provider){
        $this->providerService->editPassword( $provider->id,  $request->all() );
        return back()->with("message", "パスワードを編集しました");
    }

    public function delete(Provider $provider){
        $this->providerService->delete( $provider->id);
        return back()->with("message", "削除しました");
    }
}
