<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\Services\ContentImageService;
use App\Models\Content;
use App\Models\ContentImage;


class ContentImageController extends Controller
{
    protected $contentImageService;

    public function __construct(ContentImageService $contentImageService){
        $this->middleware('auth:admin');
        $this->contentImageService = $contentImageService;
    }

    public function add(Request $request, Content $content){
        if($request->file('image') == null){
            return back()->withErrors(["image" => "画像を選択してください"]);
        }
        $this->contentImageService->add( $content->id, $request->file('image') );
        return back()->with('message', '画像を追加しました');
    }

    public function delete(Request $request, Content $content, ContentImage $contentImage){
        $this->contentImageService->delete($contentImage->id);
        return back()->with('message', '画像を削除しました');
    }
}
