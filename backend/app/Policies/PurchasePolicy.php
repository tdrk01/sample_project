<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Purchase;
use Illuminate\Auth\Access\HandlesAuthorization;

class PurchasePolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\User  $model
     * @return mixed
     */
    public function view(User $user, Purchase $purchase)
    {
        return $user->id == $purchase->user_id 
            || $user->id == $purchase->reciever_id
            || $purchase->reciever_id == null ;
    }

    public function detail(User $user, Purchase $purchase)
    {
        return $user->id == $purchase->reciever_id;
    }

    /**
     * Determine whether the user can create models.
     *
     * @param  \App\Models\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        return true;
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\User  $model
     * @return mixed
     */
    public function draw(User $user, Purchase $purchase)
    {
        return $user->id == $purchase->reciever_id
            || $purchase->reciever_id == null ;
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\User  $model
     * @return mixed
     */
    public function update(User $user, Purchase $purchase)
    {
        return $purchase->reciever_id != null && $user->id == $purchase->reciever_id;
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\User  $model
     * @return mixed
     */
    public function use(User $user, Purchase $purchase)
    {
        return $purchase->reciever_id != null && $user->id == $purchase->reciever_id;
    }

}
