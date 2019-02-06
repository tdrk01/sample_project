<?php

namespace App\Http\Controllers\Provider;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

use App\Services\ContentService;
use App\Models\Content;

class ContentController extends Controller
{
    protected $contentService;

    public function __construct(ContentService $contentService){
        $this->middleware('auth:provider');
        $this->contentService = $contentService;
    }

    public function index(Request $request){
        $contents = $this->contentService->search([
            "provider_id" => Auth::guard("provider")->id()
        ],  20,
            $request->input("order", "created_at"), 
            $request->input("sort", "asc")
        );
        return view("provider.contents.index" , [
            "contents" => $contents,
            "params" => $request->all()
        ]);
    }

    public function showEditForm(Request $request, Content $content){
        $this->authorize("update", $content);
        $content->load(["contentImages"]);
        return view("provider.contents.edit", [
            "content" => $content
        ]);
    }

    public function edit(Request $request, Content $content){
        $this->authorize("update", $content);
        $content = $this->contentService->edit( $content->id, $request->except( Content::$hiddenForProvider ) );
        return back()->with("message", "更新しました");
    }
}
