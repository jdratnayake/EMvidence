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
            $table->bigInteger('upload_user_id')->unsigned();  
            $table->string('file_unique_name')->nullable();         
            $table->string('file_path')->nullable();
            $table->string('file_name')->nullable();
            $table->dateTime('created_time')->nullable();
            $table->bigInteger('file_size')->unsigned()->nullable();
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
