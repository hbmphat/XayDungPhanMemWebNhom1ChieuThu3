<?php

namespace Database\Seeders;

use App\Models\Provider;
use App\Models\Sim;
use Illuminate\Database\Seeder;

class SimSeeder extends Seeder
{
    public function run(): void
    {
        $viettel = Provider::where('name', 'Viettel')->first();
        $vinaphone = Provider::where('name', 'Vinaphone')->first();
        $mobifone = Provider::where('name', 'Mobifone')->first();

        if (! $viettel || ! $vinaphone || ! $mobifone) {
            return;
        }

        $sims = [
            [
                'sim_number' => '098.333.8888',
                'price' => 120000000,
                'type' => 'Tứ quý',
                'description' => 'SIM số đẹp VIP cho khách hàng doanh nghiệp.',
                'is_active' => true,
                'provider_id' => $viettel->id,
            ],
            [
                'sim_number' => '088.666.9999',
                'price' => 88000000,
                'type' => 'Tam hoa',
                'description' => 'SIM số đẹp, dễ nhớ và nổi bật.',
                'is_active' => true,
                'provider_id' => $vinaphone->id,
            ],
            [
                'sim_number' => '090.123.4567',
                'price' => 3500000,
                'type' => 'Thường',
                'description' => 'Phù hợp cho nhu cầu phổ thông.',
                'is_active' => false,
                'provider_id' => $mobifone->id,
            ],
        ];

        foreach ($sims as $sim) {
            Sim::firstOrCreate(
                ['sim_number' => $sim['sim_number']],
                $sim,
            );
        }
    }
}
