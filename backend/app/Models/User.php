<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Passport\HasApiTokens;

/**
 * @property int $id
 * @property string $created_at
 * @property string $updated_at
 * @property string $deleted_at
 * @property string $name
 * @property string $post_code
 * @property string $address
 * @property string $email
 * @property string $password
 * @property string $remember_token
 * @property string $init_token
 * @property string $payment_token
 * @property PromotionCode[] $promotionCodes
 * @property Purchase[] $purchases
 * @property Reciept[] $reciepts
 * @property SocialAccount[] $socialAccounts
 */
class User extends Authenticatable
{
    const MALE = 0;
    const FEMALE = 1;

    use HasApiTokens, SoftDeletes;

    protected $dates = ['deleted_at', 'birthday'];

    protected $hidden = [ 'password', 'remember_token'];

    /**
     * @var array
     */
    protected $fillable = ['created_at', 'updated_at', 'deleted_at', 'name', 'email', 'password', 'gender', 'birthday', 'tel', 'remember_token', 'init_token', 'payment_token', 'opted_out', 'post_code', 'address'];

    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = bcrypt($value);
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

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function recieves()
    {
        return $this->hasMany('App\Models\Purchase', 'reciever_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function socialAccounts()
    {
        return $this->hasMany('App\Models\SocialAccount');
    }
}
