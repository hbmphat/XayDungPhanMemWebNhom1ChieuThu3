<?php

namespace App\Http\Requests\User;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        // Lấy ID từ route để loại trừ chính nó khi check Unique
        $userParam = $this->route('user');
        $userId = $userParam instanceof \App\Models\User ? $userParam->id : $userParam;

        return [
            'user_name' => [
                'sometimes',
                'string',
                'max:255',
                Rule::unique('users')->ignore($userId)
            ],
            'first_name' => 'sometimes|string|max:255',
            'last_name' => 'sometimes|string|max:255',
            'email' => [
                'sometimes',
                'string',
                'email',
                'max:255',
                Rule::unique('users')->ignore($userId)
            ],
            'password' => 'sometimes|nullable|string|min:8',
            'date_of_birth' => 'sometimes|date',
            'phone' => [
                'sometimes',
                'string',
                'max:255',
                Rule::unique('users')->ignore($userId)
            ],
            'address' => 'sometimes|string|max:255',
            'role' => 'sometimes|string|max:255',
            'status' => 'sometimes|string|max:255',
        ];
    }
}
