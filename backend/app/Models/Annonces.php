<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Annonces extends Model
{
    use HasFactory;

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function postulation()
    {
        return $this->hasMany(Postulation::class);
    }

    protected $fillable = [
        'titre',
        'description',
        'type',
        'competance',
        'date',
        'location',
        'user_id',
    ];
}
