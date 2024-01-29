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
        Schema::create('users', function (Blueprint $table) {
            $table->id('user_id');
            $table->string('user_type', 32)->nullable(false);
            $table->string('account_status', 32)->nullable(false);
            $table->string('first_name', 64)->nullable(false);
            $table->string('last_name', 64)->nullable(false);
            $table->string('email', 128)->unique();
            $table->string('password', 60)->nullable(false);
            $table->string('phone_number', 32);
            $table->string('profile_picture', 512);
            $table->timestamp('account_creation_timestamp')->default(now())->nullable(false);
            $table->timestamp('last_login_timestamp');
            $table->timestamp('updated_at')->nullable(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
