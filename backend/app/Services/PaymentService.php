<?php

namespace App\Services;

use App\Services\PayJpService;

class PaymentService
{
    protected $payJpService;

    public function __construct( PayJpService $payJpService ){
        $this->payJpService = $payJpService;
    }

    public function checkCredit( $price, $tokenId ){
        return $this->payJpService->createTokenId($price, $tokenId);
    }

    public function doClaim( $token ){
        return $this->payJpService->doClaim($token);
    }

    public function releaseCredit( $token ){
        return $this->payJpService->releaseCredit($token);
    }
}
