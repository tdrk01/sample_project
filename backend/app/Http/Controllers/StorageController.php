<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class StorageController extends Controller
{
    public function index($dir, $path) {
        if( config("filesystems.default") == "s3" ){
            $s3Path = $dir."/".$path;
            if(Storage::exists($s3Path)){
                $file = Storage::get($s3Path);
                return response()->make($file, 200, ["Content-Type" => "*"]);
            }
        }
        return abort(404);
    }
}
