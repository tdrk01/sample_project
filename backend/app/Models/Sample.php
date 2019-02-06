<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $sentence
 */
class Sample extends Model
{
    /**
     * @var array
     */
    protected $fillable = ['title', 'summary', 'image_url', 'is_rare', 'win_rate', 'follow_text'];

}
