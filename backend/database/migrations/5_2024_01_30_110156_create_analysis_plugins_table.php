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
            $table->string('plugin_filename', 128)->nullable(false)->unique();
            $table->string('machine_learning_model_name', 128)->nullable(false)->unique();
            $table->string('analysis_plugin_dependency_name', 512)->nullable(false);
            $table->timestamp('plugin_upload_timestamp')->default(now())->nullable(false);
            // initial
            // compatible
            // incompatible
            $table->string('compatibility_status', 16)->nullable(false)->default('initial');
            $table->timestamp('plugin_compatibility_verified_timestamp')->nullable(true);
            // initial
            // compatible
            // incompatible
            $table->string('plugin_file_validation_status', 16)->nullable(false)->default('initial');
            $table->timestamp('plugin_file_validation_verified_timestamp')->nullable(true);
            $table->float('rating')->nullable(false)->default(0.00);
            $table->integer('number_of_usage_times')->nullable(false)->default(0);
            $table->timestamp('updated_at')->default(now())->nullable(false);
            $table->foreignId('user_id');
            $table->foreignId('device_id');
            $table->foreignId('compatibility_check_admin_id')->nullable(true);
            $table->foreignId('file_validation_verified_admin_id')->nullable(true);
        });

        Schema::table('analysis_plugins', function ($table) {
            $table->foreign('user_id')->references('user_id')->on('users')->onDelete('cascade');
            $table->foreign('device_id')->references('device_id')->on('devices')->onDelete('cascade');
            $table->foreign('compatibility_check_admin_id')->references('user_id')->on('users')->onDelete('cascade');
            $table->foreign('file_validation_verified_admin_id')->references('user_id')->on('users')->onDelete('cascade');
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
