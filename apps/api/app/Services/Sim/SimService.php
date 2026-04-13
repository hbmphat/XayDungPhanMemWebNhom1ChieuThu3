<?php

namespace App\Services\Sim;

use App\Models\Sim;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class SimService
{
    public function getPaginatedSims(int $perPage, array $filters = []): LengthAwarePaginator
    {
        return Sim::query()
            ->with('provider')
            ->when(!empty($filters['search']), function ($query) use ($filters) {
                $search = '%' . mb_strtolower(trim($filters['search'])) . '%';
                $query->where(function ($q) use ($search) {
                    $q->whereRaw('LOWER(sim_number) LIKE ?', [$search])
                        ->orWhereRaw('LOWER(type) LIKE ?', [$search])
                        ->orWhereRaw('LOWER(description) LIKE ?', [$search])
                        ->orWhereHas('provider', function ($providerQuery) use ($search) {
                            $providerQuery->whereRaw('LOWER(name) LIKE ?', [$search]);
                        });
                });
            })
            ->when(isset($filters['provider_id']) && $filters['provider_id'] !== '', function ($query) use ($filters) {
                $query->where('provider_id', $filters['provider_id']);
            })
            ->when(isset($filters['is_active']) && $filters['is_active'] !== '', function ($query) use ($filters) {
                $query->where('is_active', filter_var($filters['is_active'], FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE));
            })
            ->latest()
            ->paginate($perPage);
    }

    public function createSim(array $data): Sim
    {
        $data['sim_number'] = preg_replace('/\s+/', '', (string) ($data['sim_number'] ?? ''));
        $data['price'] = (string) $data['price'];
        $data['is_active'] = array_key_exists('is_active', $data) ? (bool) $data['is_active'] : true;

        return Sim::create($data)->load('provider');
    }

    public function getSim(Sim $sim): Sim
    {
        return $sim->load('provider');
    }

    public function updateSim(array $data, Sim $sim): Sim
    {
        if (array_key_exists('sim_number', $data)) {
            $data['sim_number'] = preg_replace('/\s+/', '', (string) $data['sim_number']);
        }

        $sim->update($data);

        return $sim->refresh()->load('provider');
    }

    public function deleteSim(Sim $sim): bool
    {
        return $sim->delete();
    }
}
