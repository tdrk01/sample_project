<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $created_at
 * @property string $updated_at
 * @property string $email
 */
class Contact extends Model
{
    /**
     * @var array
     */
    protected $fillable = ['created_at', 'updated_at', 'email', 'description'];
}
