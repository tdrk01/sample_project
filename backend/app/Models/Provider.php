<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;

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
class Provider extends Authenticatable
{
    use SoftDeletes;

    protected $hidden = [ 'password', 'remember_token'];

    protected $dates = [
        'deleted_at', 'agreed_at'
    ];
    /**
     * @var array
     */
    protected $fillable = ['created_at', 'updated_at', 'email', 'password', 'remember_token', 'company_name', 'address', 'tel', 'agreed_at', 'bank_name', 'bank_shop_name', 'bank_number', 'bank_type_id'];

    public function getNameAttribute(){
        return $this->company_name;
    }

    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = bcrypt($value);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function contents()
    {
        return $this->hasMany('App\Models\Content');
    }
}
