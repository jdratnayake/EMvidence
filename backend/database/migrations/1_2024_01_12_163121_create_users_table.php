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
            // admin
            // investigator
            // developer
            $table->string('user_type', 16)->nullable(false);
            // unverified
            // verified
            $table->string('account_status', 16)->nullable(false)->default('unverified');
            // false => active
            // true => inactive
            $table->string('ban_status', 16)->nullable(false)->default('false');
            $table->string('first_name', 64)->nullable(false);
            $table->string('last_name', 64)->nullable(false);
            $table->string('email', 128)->unique();
            $table->string('password', 60)->nullable(false);
            $table->string('phone_number', 32)->nullable(true);
            $table->string('profile_picture', 512)->default('default.svg');
            $table->timestamp('account_creation_timestamp')->default(now())->nullable(false);
            $table->timestamp('last_login_timestamp')->nullable(true);
            $table->timestamp('updated_at')->default(now())->nullable(false);
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
