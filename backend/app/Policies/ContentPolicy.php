<?php

namespace App\Policies;

use App\Models\Content;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Foundation\Auth\User as Authenticatable;

class ContentPolicy
{
    use HandlesAuthorization;

    private function isAdmin(Authenticatable $user){
        return get_class($user) === "App\Models\Administrator";
    }

    /**
     * Determine whether the user can view the content.
     *
     * @param  \  $user
     * @param  \App\Content  $content
     * @return mixed
     */
    public function view(Authenticatable $user, Content $content)
    {
        return true;
    }

    /**
     * Determine whether the user can create contents.
     *
     * @param  \  $user
     * @return mixed
     */
    public function create(Authenticatable $user)
    {
        return $this->isAdmin($user);
    }

    /**
     * Determine whether the user can update the content.
     *
     * @param  \  $user
     * @param  \App\Content  $content
     * @return mixed
     */
    public function update(Authenticatable $user, Content $content)
    {
        return $this->isAdmin($user) || $user->id == $content->provider_id;
    }

    /**
     * Determine whether the user can delete the content.
     *
     * @param  \  $user
     * @param  \App\Content  $content
     * @return mixed
     */
    public function delete(Authenticatable $user, Content $content)
    {
        return $this->isAdmin($user);
    }
}
