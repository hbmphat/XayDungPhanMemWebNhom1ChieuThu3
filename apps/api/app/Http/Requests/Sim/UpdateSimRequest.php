<?php

namespace App\Http\Requests\Sim;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateSimRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $simParam = $this->route('sim');
        $simId = $simParam instanceof \App\Models\Sim ? $simParam->id : $simParam;

        return [
            'sim_number' => [
                'sometimes',
                'required',
                'string',
                'min:6',
                'max:20',
                Rule::unique('sims')->ignore($simId),
            ],
            'price' => ['sometimes', 'required', 'numeric', 'min:0'],
            'type' => ['sometimes', 'required', 'string', 'min:2', 'max:50'],
            'description' => ['sometimes', 'nullable', 'string'],
            'is_active' => ['sometimes', 'boolean'],
            'provider_id' => ['sometimes', 'required', 'uuid', 'exists:providers,id'],
        ];
    }

    public function messages(): array
    {
        return [
            'sim_number.unique' => 'SIM number has already been taken.',
            'provider_id.exists' => 'Selected provider does not exist.',
        ];
    }
}
