<?php

namespace Database\Seeders;

use App\Models\Provider;
use Illuminate\Database\Seeder;

class ProviderSeeder extends Seeder
{
    public function run(): void
    {
        foreach (['Viettel', 'Vinaphone', 'Mobifone'] as $name) {
            Provider::firstOrCreate(['name' => $name]);
        }
    }
}
