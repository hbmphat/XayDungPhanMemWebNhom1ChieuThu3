<?php

namespace App\Http\Controllers\Provider;

use App\Http\Controllers\Controller;
use App\Http\Requests\Provider\StoreProviderRequest;
use App\Http\Requests\Provider\UpdateProviderRequest;
use App\Http\Resources\Provider\ProviderCollection;
use App\Http\Resources\Provider\ProviderResource;
use App\Models\Provider;
use App\Services\Provider\ProviderService;
use Illuminate\Http\JsonResponse;

class ProviderController extends Controller
{
    protected ProviderService $providerService;

    public function __construct(ProviderService $providerService)
    {
        $this->providerService = $providerService;
    }

    public function index(): JsonResponse
    {
        $providers = $this->providerService->getAllProviders();
        return $this->successResponse(new ProviderCollection($providers), 'Provider list');
    }

    public function store(StoreProviderRequest $request): JsonResponse
    {
        $provider = $this->providerService->createProvider($request->validated());
        return $this->successResponse(new ProviderResource($provider), 'Created successfully', 201);
    }

    public function show(Provider $provider): JsonResponse
    {
        return $this->successResponse(new ProviderResource($this->providerService->getProvider($provider)), 'Provider information');
    }

    public function update(UpdateProviderRequest $request, Provider $provider): JsonResponse
    {
        $provider = $this->providerService->updateProvider($request->validated(), $provider);
        return $this->successResponse(new ProviderResource($provider), 'Updated successfully');
    }

    public function destroy(Provider $provider): JsonResponse
    {
        $this->providerService->deleteProvider($provider);
        return $this->successResponse(null, 'Deleted successfully');
    }
}
