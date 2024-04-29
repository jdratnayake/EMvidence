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
        Schema::create('reports', function (Blueprint $table) {
            $table->id('report_id');
            $table->string('report_visible_name', 128)->nullable(false);
            $table->string('report_file_name', 128)->unique()->nullable(false);
            $table->timestamp('created_date')->default(now())->nullable(false);
            $table->foreignId('user_id');
        });

        Schema::table('reports', function ($table) {
            $table->foreign('user_id')->references('user_id')->on('users')->onDelete('cascade');
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reports');
    }
};
