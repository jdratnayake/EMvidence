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
        Schema::create('analysis_plugins', function (Blueprint $table) {
            $table->id('plugin_id');
            $table->string('plugin_name', 64)->nullable(false)->unique();
            $table->string('plugin_description', 512)->nullable(false);
            $table->float('center_frequency')->nullable(false);
            $table->float('sampling_rate')->nullable(false);
            $table->integer('fft_size')->nullable(false);
            $table->integer('number_of_usage_times')->nullable(false)->default(0);
            $table->timestamp('plugin_upload_timestamp')->default(now())->nullable(false);
            $table->string('icon_filename', 128)->nullable(false)->unique();
            $table->string('dependency_filename', 128)->nullable(false)->unique();
            $table->string('plugin_script_filename', 128)->nullable(false)->unique();
            $table->string('ml_model_filename', 128)->nullable(false)->unique();
            // initial
            // pending
            // compatible
            // incompatible
            $table->string('compatibility_status', 16)->nullable(false)->default('initial');
            $table->timestamp('plugin_compatibility_verified_timestamp')->nullable(true);
            $table->timestamp('updated_at')->default(now())->nullable(false);
            $table->foreignId('user_id');
            $table->foreignId('device_id');
            $table->foreignId('em_file_id');
            $table->foreignId('compatibility_check_admin_id')->nullable(true);
        });

        Schema::table('analysis_plugins', function ($table) {
            $table->foreign('user_id')->references('user_id')->on('users')->onDelete('cascade');
            $table->foreign('device_id')->references('device_id')->on('devices')->onDelete('cascade');
            $table->foreign('em_file_id')->references('em_raw_file_id')->on('em_data_files')->onDelete('cascade');
            $table->foreign('compatibility_check_admin_id')->references('user_id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('analysis_plugins');
    }
};
