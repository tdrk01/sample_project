<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property int $user_id
 * @property string $created_at
 * @property string $updated_at
 * @property string $provider_name
 * @property string $provider_id
 * @property User $user
 */
class SocialAccount extends Model
{
    /**
     * @var array
     */
    protected $fillable = ['user_id', 'created_at', 'updated_at', 'authorizer_name', 'authorizer_id'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo('App\Models\User');
    }
}
