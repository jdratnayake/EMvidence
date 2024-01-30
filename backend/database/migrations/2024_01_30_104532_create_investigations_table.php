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
        Schema::create('investigations', function (Blueprint $table) {
            $table->id('investigation_id');
            $table->string('description', 512)->nullable(true);
            // initial
            // in-progress
            // completed
            $table->string('investigation_status', 16)->nullable(false)->default('initial');
            $table->timestamp('investigation_creation_timestamp')->default(now())->nullable(false);
            $table->timestamp('investigation_archived_timestamp')->nullable(true);
            $table->timestamp('updated_at')->default(now())->nullable(false);
            $table->foreignId('user_id');
        });

        Schema::table('investigations', function($table) {
            $table->foreign('user_id')->references('user_id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('investigations');
    }
};
