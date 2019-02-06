<?php

namespace App\Services;

use Illuminate\Support\Facades\Storage;
use App\Models\ContentImage;
use Validator;

class ContentImageService
{
    public function add($contentId, $file){
        $url = Storage::putFile("content_images", $file, "public");
        $image = ContentImage::create([
            "content_id" => $contentId,
            "image_url" => $url
        ]);
        return $image;
    }

    public function delete($contentImageId){
        $contentImage = ContentImage::find($contentImageId);
        Storage::delete($contentImage->image_url);
        $contentImage->delete();
    }
}
