<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @property int $id
 * @property string $created_at
 * @property string $updated_at
 * @property string $name
 * @property string $description
 * @property int $price
 * @property string $image_url
 * @property string $slug
 * @property Content[] $contents
 * @property PromotionCode[] $promotionCodes
 * @property Purchase[] $purchases
 */
class Box extends Model
{
    use SoftDeletes;

    protected $dates = ['deleted_at'];
    /**
     * @var array
     */
    protected $fillable = ['created_at', 'updated_at', 'deleted_at', 'name', 'remarked', 'description', 'price', 'image_url', 'slug', 'priority'];


    public function getTaxedPriceAttribute()
    {
        return (int)($this->price * 1.08);
    }
    
    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function contents()
    {
        return $this->hasMany('App\Models\Content');
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
    public function purchases()
    {
        return $this->hasMany('App\Models\Purchase');
    }
}
