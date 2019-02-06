<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property int $condition_category_id
 * @property string $label
 * @property ConditionCategory $conditionCategory
 * @property Filter[] $filters
 * @property Targe[] $targes
 */
class Condition extends Model
{
    public $timestamps = false;
    /**
     * @var array
     */
    protected $fillable = ['condition_category_id', 'label'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function conditionCategory()
    {
        return $this->belongsTo('App\Models\ConditionCategory');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function filters()
    {
        return $this->hasMany('App\Models\Filter');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function targets()
    {
        return $this->hasMany('App\Models\Target');
    }
}
