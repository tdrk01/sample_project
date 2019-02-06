<?php

namespace App\Services;

use App\Models\Condition;
use App\Models\ConditionCategory;

class ConditionService
{
    public function getAllByCategory(){
        return ConditionCategory::with(["conditions"])->orderBy("priority", "ASC")->get();
    }
}
