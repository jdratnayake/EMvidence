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
        Schema::create('em_data_file', function (Blueprint $table) {
            $table->id('file_id');
            $table->bigInteger('upload_user_id')->unsigned(); ;            
            $table->string('file_path');
            $table->string('file_name');
            $table->dateTime('created_time');
            $table->float('file_size');
            $table->foreign('upload_user_id')->references('user_id')->on('user');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('em_data_file');
    }
};
