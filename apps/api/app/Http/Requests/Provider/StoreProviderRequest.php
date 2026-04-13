<?php

namespace App\Http\Requests\Provider;

use Illuminate\Foundation\Http\FormRequest;

class StoreProviderRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => [
                'required',
                'string',
                'min:2',
                'max:50',
                'unique:providers,name',
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
