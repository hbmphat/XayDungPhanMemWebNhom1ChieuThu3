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
        Schema::create('sims', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('sim_number', 20)->unique();
            $table->decimal('price', 12, 2);
            $table->string('type', 50);
            $table->text('description')->nullable();
            $table->boolean('is_active')->default(true)->index();
            $table->foreignUuid('provider_id')->constrained('providers')->cascadeOnUpdate()->restrictOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sims');
    }
};
