<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }

    public function is_admin(){
        return $this->admin()->exists();
    }
    public function is_organizer(){
        return $this->organizer()->exists();
    }
    public function is_volunteer(){
        return $this->volunteer()->exists();
    }

    public function getType()
    {
        if ($this->is_admin()) {
            return 'admin';
        } elseif ($this->is_organizer()) {
            return 'organizer';
        } elseif ($this->is_volunteer()) {
            return 'volunteer';
        }
    }
    public function volunteer(){
        return $this->hasOne(Volunteer::class);
    }
    public function organizer(){
        return $this->hasOne(Organizer::class);
    }
    public function admin(){
        return $this->hasOne(Admin::class);
    }


}
