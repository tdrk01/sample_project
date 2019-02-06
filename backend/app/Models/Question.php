<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $sentence
 */
class Question extends Model
{
    public $timestamps = false;
    /**
     * @var array
     */
    protected $fillable = ['sentence', 'priority'];

}
