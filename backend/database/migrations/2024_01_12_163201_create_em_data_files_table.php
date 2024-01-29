<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('em_data_files', function (Blueprint $table) {
            $table->id('rm_raw_file_id');
            $table->foreignId('user_id');
            $table->string('em_raw_file_name', 128)->unique()->nullable(false);
            $table->string('em_raw_file_visible_name', 128)->nullable(false);
            $table->string('em_raw_cfile_hash', 256)->nullable(false);
            $table->string('em_preprocess_file_name', 128)->unique();
            $table->bigInteger('em_raw_h5_file_size')->nullable(false);
            $table->string('em_raw_h5_hash', 256)->nullable(false);
            $table->string('device_name', 64)->nullable(false);
            $table->float('center_frequency')->nullable(false);
            $table->float('sampling_rate')->nullable(false);
            $table->timestamp('file_upload_timestamp')->default(now());
            $table->timestamp('preprocessing_file_creation_timestamp')->nullable();
            $table->timestamp('updated_at');
        });

        Schema::table('em_data_files', function($table) {
            $table->foreign('user_id')->references('user_id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('em_data_files');
    }
};
