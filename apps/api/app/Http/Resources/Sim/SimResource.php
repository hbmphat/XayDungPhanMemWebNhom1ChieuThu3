<?php

namespace App\Http\Resources\Sim;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SimResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'sim_id' => $this->id,
            'sim_number' => $this->sim_number,
            'price' => (float) $this->price,
            'type' => $this->type,
            'description' => $this->description,
            'is_active' => $this->is_active,
            'provider_id' => $this->provider_id,
            'provider_name' => $this->whenLoaded('provider', fn () => $this->provider?->name),
            'created_at' => $this->created_at?->format('d-m-Y H:i'),
            'updated_at' => $this->updated_at?->format('d-m-Y H:i'),
        ];
    }
}
