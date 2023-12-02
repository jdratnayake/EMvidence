<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmFileModel extends Model
{
    use HasFactory;
    protected $table = 'em_data_file';
    protected $primaryKey = 'file_id';
    protected $fillable = ['file_id', 'upload_user_id', 'file_path', 'file_name','created_time','file_size' ,'file_unique_name'];
}
