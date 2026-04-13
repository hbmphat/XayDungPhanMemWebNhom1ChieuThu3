<?php

namespace App\Http\Requests\Sim;

use Illuminate\Foundation\Http\FormRequest;

class StoreSimRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'sim_number' => [
                'required',
                'string',
                'min:6',
                'max:20',
                'unique:sims,sim_number',
            ],
            'price' => ['required', 'numeric', 'min:0'],
            'type' => ['required', 'string', 'min:2', 'max:50'],
            'description' => ['nullable', 'string'],
            'is_active' => ['required', 'boolean'],
            'provider_id' => ['required', 'uuid', 'exists:providers,id'],
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
