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
            $table->id('em_raw_file_id');
            // processing
            // processed
            // faild
            $table->string('em_raw_upload_status', 16)->nullable(false)->default('processing');
            $table->string('em_raw_file_name', 128)->unique()->nullable(false);
            $table->string('em_raw_file_visible_name', 128)->nullable(false);
            $table->string('em_raw_cfile_hash', 256)->nullable(false);
            $table->string('em_preprocess_file_name', 128)->unique()->nullable(true);
            $table->bigInteger('em_raw_cfile_file_size')->nullable(false);
            $table->bigInteger('em_raw_h5_file_size')->nullable(false);
            $table->string('em_raw_h5_hash', 256)->nullable(false);
            $table->float('center_frequency')->nullable(false);
            $table->float('sampling_rate')->nullable(false);
            $table->timestamp('file_upload_timestamp')->nullable(true);
            $table->timestamp('preprocessing_file_creation_timestamp')->nullable(true);
            $table->timestamp('updated_at')->default(now())->nullable(false);
            $table->foreignId('user_id');
            $table->foreignId('device_id');
        });

        Schema::table('em_data_files', function ($table) {
            $table->foreign('user_id')->references('user_id')->on('users')->onDelete('cascade');
            $table->foreign('device_id')->references('device_id')->on('devices')->onDelete('cascade');
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
