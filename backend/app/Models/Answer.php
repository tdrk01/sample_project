<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $created_at
 * @property string $updated_at
 * @property int $question_id
 * @property string $sentence
 * @property int $purchase_id
 * @property int $selection
 */
class Answer extends Model
{
    /**
     * @var array
     */
    protected $fillable = ['created_at', 'updated_at', 'question_id', 'sentence', 'purchase_id', 'selection'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function question()
    {
        return $this->belongsTo('App\Models\Question');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function purchase()
    {
        return $this->belongsTo('App\Models\Purchase');
    }
}
