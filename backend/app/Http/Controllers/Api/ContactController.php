<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\Services\ContactService;
use App\Events\Contacted;
use App\Http\Resources\ContactResource;

class ContactController extends Controller
{
    protected $contactService;

    public function __construct(ContactService $contactService){
        $this->contactService = $contactService;
    }

    public function add( Request $request ){
        $contact = $this->contactService->add( $request->all() );
        event( new Contacted($contact) );
        return $this->isSuccessResource( new ContactResource($contact), "問い合わせを受け付けました");
    }

}
