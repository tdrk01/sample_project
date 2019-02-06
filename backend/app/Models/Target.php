<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property int $condition_id
 * @property int $purchase_id
 * @property string $created_at
 * @property string $updated_at
 * @property Condition $condition
 * @property Purchase $purchase
 */
class Target extends Model
{
    /**
     * @var array
     */
    protected $fillable = ['condition_id', 'purchase_id', 'created_at', 'updated_at'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function condition()
    {
        return $this->belongsTo('App\Models\Condition');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function purchase()
    {
        return $this->belongsTo('App\Models\Purchase');
    }
}
