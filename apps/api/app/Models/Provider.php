<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Provider extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'name',
    ];

    public function sims(): HasMany
    {
        return $this->hasMany(Sim::class);
    }
}
