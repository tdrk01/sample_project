<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\Models\Content;
use App\Services\ContentService;
use App\Http\Resources\ContentResource;
use App\Http\Resources\ContentCollection;

class ContentController extends Controller
{
    protected $contentService;

    public function __construct(ContentService $contentService){
        $this->contentService = $contentService;
    }

    public function index(Request $request){
        $contents = $this->contentService->search( $request->all() );
        return $this->isSuccessResource( new ContentCollection($contents) );
    }
    public function view(Content $content){
        $content->load(["provider", "box", "contentCategory", "contentImages"]);
        return $this->isSuccessResource( new ContentResource($content) );
    }
}
