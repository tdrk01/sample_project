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
class Campaign extends Model
{
    const CODE_RESTRICTED = 0;
    const USER_RESTRICTED = 1;
    const FREE = 2;

    protected $dates = [
        'expired_at'
    ];

    /**
     * @var array
     */
    protected $fillable = ['created_at', 'updated_at', 'name', 'code', 'expired_at', 'campaign_type'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function promotionCodes()
    {
        return $this->hasMany('App\Models\PromotionCode');
    }
}
