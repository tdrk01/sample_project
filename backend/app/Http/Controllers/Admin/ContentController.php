<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

use App\Services\ContentService;
use App\Models\Content;

class ContentController extends Controller
{
    protected $contentService;

    public function __construct(ContentService $contentService){
        $this->middleware('auth:admin');
        $this->contentService = $contentService;
    }

    public function index(Request $request){
        $contents = $this->contentService->search(
            $request->all(),  20,
            $request->input("order", "created_at"), 
            $request->input("sort", "asc")
        );
        return view("admin.contents.index" , [
            "contents" => $contents,
            "params" => $request->all()
        ]);
    }

    public function add(Request $request){
        $this->contentService->add($request->all() );
        return back()->with("message", "追加しました");
    }

    public function showEditForm(Content $content){
        $content->load("contentImages", "contentCategory");
        return view("admin.contents.edit", [
            "content" => $content
        ]);
    }

    public function edit(Request $request, Content $content){
        $this->contentService->edit( $content->id, $request->all() );
        return back()->with("message", "更新しました");
    }

    public function delete(Content $content){
        $this->contentService->delete($content->id);
        return redirect()->route("admin.contents.index");
    }
}
