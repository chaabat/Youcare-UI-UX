<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Postulation extends Model
{
    use HasFactory;


    protected $fillable = [
      'annonce_id',
      'user_id',
      'accepted_at',
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function annonce()
    {
        return $this->belongsTo(Annonces::class, 'annonce_id');
    }
}
