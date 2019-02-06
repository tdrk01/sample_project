<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $label
 * @property string $question
 * @property Condition[] $conditions
 */
class ConditionCategory extends Model
{
    public $timestamps = false;
    /**
     * @var array
     */
    protected $fillable = ['label', 'question', 'priority'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function conditions()
    {
        return $this->hasMany('App\Models\Condition');
    }
}
