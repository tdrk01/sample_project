<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property int $user_id
 * @property int $purchase_id
 * @property int $box_id
 * @property string $created_at
 * @property string $updated_at
 * @property string $campaign
 * @property string $code
 * @property Box $box
 * @property Purchase $purchase
 * @property User $user
 */
class PromotionCode extends Model
{
    protected $dates = [
        'expired_at'
    ];
    /**
     * @var array
     */
    protected $fillable = ['user_id', 'purchase_id', 'box_id', 'created_at', 'updated_at', 'campaign_id', 'code', 'price', 'expired_at'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function campaign()
    {
        return $this->belongsTo('App\Models\Campaign');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function box()
    {
        return $this->belongsTo('App\Models\Box');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function purchase()
    {
        return $this->belongsTo('App\Models\Purchase');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo('App\Models\User');
    }
}
