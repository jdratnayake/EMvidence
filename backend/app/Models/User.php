<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $table = 'users';

    protected $primaryKey = 'user_id';

    protected $fillable = [
        'user_type',
        'account_status',
        'first_name',
        'last_name',
        'email',
        'password',
        'phone_number',
        'profile_picture',
        'account_creation_timestamp',
        'last_login_timestamp',
        'updated_at',
    ];

    protected $hidden = [
        'password'
    ];
}
