<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->boolean('is_admin')->default(false)->index();
            $table->timestamp('last_login_at')->nullable()->index();
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropIndex(['is_admin']);
            $table->dropIndex(['last_login_at']);
            $table->dropColumn(['is_admin', 'last_login_at']);
        });
    }
};
