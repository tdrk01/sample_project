<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;
use App\Models\ContentCategory;
use Validator;

class ContentCategoryService
{
    public function getAll(){
        return Cache::get("content_category", function() {
            $categories = ContentCategory::get();
            Cache::put("content_category", $categories, 240);
            return $categories;
        });
    }
}