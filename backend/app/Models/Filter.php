<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property int $condition_id
 * @property int $content_id
 * @property Content $content
 * @property Condition $condition
 */
class Filter extends Model
{
    public $timestamps = false;
    /**
     * @var array
     */
    protected $fillable = ['condition_id', 'content_id'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function content()
    {
        return $this->belongsTo('App\Models\Content');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function condition()
    {
        return $this->belongsTo('App\Models\Condition');
    }
}
