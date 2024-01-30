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
        Schema::create('analysis_plugin_ratings', function (Blueprint $table) {
            $table->foreignId('user_id');
            $table->foreignId('plugin_id');
            $table->integer('rating_score')->nullable(false)->default(0);
        });

        Schema::table('analysis_plugin_ratings', function($table) {
            $table->foreign('user_id')->references('user_id')->on('users')->onDelete('cascade');
            $table->foreign('plugin_id')->references('plugin_id')->on('analysis_plugins')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('analysis_plugins_ratings');
    }
};
