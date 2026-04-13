<?php

namespace App\Http\Resources\Sim;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class SimCollection extends ResourceCollection
{
    public function toArray(Request $request): array
    {
        return parent::toArray($request);
    }
}
