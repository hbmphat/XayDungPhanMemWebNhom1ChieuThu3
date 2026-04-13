<?php

namespace App\Services\Provider;

use App\Models\Provider;
use Illuminate\Database\Eloquent\Collection;

class ProviderService
{
    public function getAllProviders(): Collection
    {
        return Provider::query()->orderBy('name')->get();
    }

    public function createProvider(array $data): Provider
    {
        return Provider::create($data)->refresh();
    }

    public function getProvider(Provider $provider): Provider
    {
        return $provider;
    }

    public function updateProvider(array $data, Provider $provider): Provider
    {
        $provider->update($data);
        return $provider;
    }

    public function deleteProvider(Provider $provider): bool
    {
        return $provider->delete();
    }
}
