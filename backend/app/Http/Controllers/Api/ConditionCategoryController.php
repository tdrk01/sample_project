<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\Models\ConditionCategory;
use App\Services\ConditionService;
use App\Http\Resources\ConditionCategoryCollection;

class ConditionCategoryController extends Controller
{
    protected $conditionService;

    public function __construct(ConditionService $conditionService){
        $this->conditionService = $conditionService;
    }

    public function index(Request $request){
        $conditionCategories = $this->conditionService->getAllByCategory();
        return $this->isSuccessResource( new ConditionCategoryCollection($conditionCategories) );
    }
}
