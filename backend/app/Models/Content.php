<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

use Carbon\Carbon;
/**
 * @property int $id
 * @property int $box_id
 * @property int $content_category_id
 * @property string $created_at
 * @property string $updated_at
 * @property string $name
 * @property string $description
 * @property string $link_url
 * @property string $tel
 * @property string $email
 * @property string $address
 * @property int $price
 * @property int $win_rate
 * @property ContentCategory $contentCategory
 * @property Box $box
 * @property ContentImage[] $contentImages
 * @property Filter[] $filters
 * @property Purchase[] $purchases
 */
class Content extends Model
{
    const DO_SELF = 0;
    const SEND = 1; //送付型
    const BY_TODOROKI = 2; //TODOROKIが電子予約する

    const NOT_SHOW = 0;
    const SHOW = 1;

    use SoftDeletes;

    protected $dates = [
        'deleted_at', 'expired_at'
    ];

    static public $hiddenForProvider = [
        "provider_id", "box_id", "contgent_category_id",
        "price", "win_rate", "display_priority", "reserve_type"
    ];

    /**
     * @var array
     */
    protected $fillable = ['box_id', 'content_category_id', 'provider_id', 'created_at', 'updated_at', 'deleted_at',
        'name', 'title', 'number', 'description', 'summary', 'email', 'reserve_way', 'address', 'access', 'length', 'tools', 'tel', 'link_url', 
        'price', 'win_rate', 'display_priority', 'reserve_type', 'hash', 'expired_at', 'expired_date'];


    public function getRouteKeyName()
    {
        return 'hash';
    }
    
    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function contentCategory()
    {
        return $this->belongsTo('App\Models\ContentCategory');
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
    public function provider()
    {
        return $this->belongsTo('App\Models\Provider');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function contentImages()
    {
        return $this->hasMany('App\Models\ContentImage');
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
    public function purchases()
    {
        return $this->hasMany('App\Models\Purchase');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function getExpiredAttribute( )
    {
        if( $this->expired_at == null && $this->expired_date == null ){
            return null;
        }
        if( $this->expired_at != null && $this->expired_date == null ){
            return $this->expired_at;
        }
        if( $this->expired_at == null && $this->expired_date != null ){
            return Carbon::now()->addDays( $this->expired_date );    
        }
        return $this->expired_at > Carbon::now()->addDays( $this->expired_date ) ? Carbon::now()->addDays( $this->expired_date ): $this->expired_at;
    }
}
