<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmDataFile extends Model
{
    use HasFactory;
    protected $table = 'em_data_files';
    protected $primaryKey = 'em_raw_file_id';
    protected $fillable = [
                          'em_raw_file_id', 
                          'em_raw_file_name',
                          'em_raw_upload_status',
                          'em_raw_file_visible_name',
                          'em_raw_cfile_hash',
                          'em_preprocess_file_name',
                          'em_raw_h5_file_size',
                          'em_raw_cfile_file_size',
                          'em_raw_h5_hash',
                          'device_id',
                          'center_frequency',
                          'sampling_rate',
                          'user_id',
                          'file_upload_timestamp',
                          'preprocessing_file_creation_timestamp'
                        ];
    public $timestamps = false;
}
