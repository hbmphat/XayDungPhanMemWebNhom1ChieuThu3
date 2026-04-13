<?php

namespace App\Http\Controllers\Sim;

use App\Http\Controllers\Controller;
use App\Http\Requests\Sim\StoreSimRequest;
use App\Http\Requests\Sim\UpdateSimRequest;
use App\Http\Resources\Sim\SimCollection;
use App\Http\Resources\Sim\SimResource;
use App\Models\Sim;
use App\Services\Sim\SimService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SimController extends Controller
{
    protected SimService $simService;

    public function __construct(SimService $simService)
    {
        $this->simService = $simService;
    }

    public function index(Request $request): JsonResponse
    {
        $perPage = $this->getPerPage();
        $filters = $request->all();
        $sims = $this->simService->getPaginatedSims($perPage, $filters);

        return $this->successResponse(new SimCollection($sims), 'SIM list');
    }

    public function store(StoreSimRequest $request): JsonResponse
    {
        $sim = $this->simService->createSim($request->validated());
        return $this->successResponse(new SimResource($sim), 'Created successfully', 201);
    }

    public function show(Sim $sim): JsonResponse
    {
        return $this->successResponse(new SimResource($this->simService->getSim($sim)), 'SIM information');
    }

    public function update(UpdateSimRequest $request, Sim $sim): JsonResponse
    {
        $sim = $this->simService->updateSim($request->validated(), $sim);
        return $this->successResponse(new SimResource($sim), 'Updated successfully');
    }

    public function destroy(Sim $sim): JsonResponse
    {
        $this->simService->deleteSim($sim);
        return $this->successResponse(null, 'Deleted successfully');
    }
}
