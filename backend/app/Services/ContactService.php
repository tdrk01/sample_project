<?php

namespace App\Services;

use App\Models\Contact;
use Validator;

class ContactService
{
    public function add( $data ){
        Validator::make($data, [
            'email' => "required|email",
            'description' => "required|string",
        ])->validate();

        return Contact::create($data);
    }
}
