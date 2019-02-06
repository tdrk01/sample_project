<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property int $content_id
 * @property string $image_url
 * @property int $priority
 * @property Content $content
 */
class ContentImage extends Model
{
    public $timestamps = false;
    /**
     * @var array
     */
    protected $fillable = ['content_id', 'image_url', 'priority'];


    public function getImageAttribute(){
        if($this->image_url == null ){
            return route('noimage');
        }
        if( preg_match("/http[s]*:/", $this->image_url) ){
            return $this->image_url;
        }else{
            return route('storage')."/".$this->image_url;
        }
    }
    
    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function content()
    {
        return $this->belongsTo('App\Models\Content');
    }
}
