<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property int $user_id
 * @property int $box_id
 * @property int $content_id
 * @property string $created_at
 * @property string $updated_at
 * @property int $payment_type
 * @property string $payment_token
 * @property int $paymemt_status
 * @property string $register_token
 * @property Content $content
 * @property Box $box
 * @property User $user
 * @property PromotionCode[] $promotionCodes
 * @property Reciept[] $reciepts
 * @property Targe[] $targes
 */
class Purchase extends Model
{
    const CANCELED = 0;
    const ORDERED = 1;
    const PAYED = 2;
    const DRAWED = 3;
    const PLAYED = 4;
    const ANSWERED = 5;

    const CARD = 1;
    const CODE_ONLY = 2;

    protected $dates = [
        'deleted_at', 'drawn_at', 'played_at', 'expired_at'
    ];

    protected $hidden = [ 'payment_token'];

    /**
     * @var array
     */
    protected $fillable = ['user_id', 'reciever_id', 'box_id', 'content_id', 'created_at', 'updated_at', 'payment_type', 'payment_token', 'status', 'register_token', 'played_at', 'drawn_at', 'score', 'list_price', 'expired_at', 'post_code', 'address'];

    public function getRouteKeyName()
    {
        return 'register_token';
    }

    public function getPriceAttribute()
    {
        $subPrice = $this->promotionCodes->reduce( function($sum, $code) {
            return $sum + $code->price;
        }, 0);

        return ($this->list_price - $subPrice) > 0 ? ($this->box->price - $subPrice) : 0;
    }

    public function getTaxedPriceAttribute()
    {
        return (int)($this->price * 1.08);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function content()
    {
        return $this->belongsTo('App\Models\Content')->withTrashed();
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
    public function user()
    {
        return $this->belongsTo('App\Models\User')->withTrashed();
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function reciever()
    {
        return $this->belongsTo('App\Models\User', 'reciever_id')->withTrashed();
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function promotionCodes()
    {
        return $this->hasMany('App\Models\PromotionCode');
    }
    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function targets()
    {
        return $this->hasMany('App\Models\Target');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function answers()
    {
        return $this->hasMany('App\Models\Answer');
    }
}
