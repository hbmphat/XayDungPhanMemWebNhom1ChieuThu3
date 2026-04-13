<?php

namespace App\Http\Requests\Provider;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateProviderRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $providerParam = $this->route('provider');
        $providerId = $providerParam instanceof \App\Models\Provider ? $providerParam->id : $providerParam;

        return [
            'name' => [
                'sometimes',
                'required',
                'string',
                'min:2',
                'max:50',
                Rule::unique('providers')->ignore($providerId),
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'name.unique' => 'Provider name has already been taken.',
        ];
    }
}
