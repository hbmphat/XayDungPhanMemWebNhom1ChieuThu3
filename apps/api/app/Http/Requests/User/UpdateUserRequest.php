<?php

namespace App\Http\Requests\User;

use App\Models\User;
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
        $userId = $userParam instanceof User ? $userParam->id : $userParam;

        return [
            'user_name' => [
                'sometimes',
                'required',
                'string',
                'min:4',
                'max:50',
                Rule::unique('users')->ignore($userId),
            ],
            'first_name' => 'sometimes|required|string|min:4|max:50',
            'last_name' => 'sometimes|required|string|min:4|max:50',
            'email' => [
                'sometimes',
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique('users')->ignore($userId),
            ],
            'phone' => [
                'sometimes',
                'required',
                'string',
                'regex:/^(0|84)(3|5|7|8|9)[0-9]{8}$/',
                Rule::unique('users')->ignore($userId),
            ],
            'password' => 'sometimes|nullable|string|min:8|max:50',
            'address' => 'sometimes|required|string|min:2|max:100',
            'date_of_birth' => 'sometimes|required|date|before_or_equal:today',
            'role' => 'sometimes|required|string|in:admin,inventory_manager,moderator,customer,collaborator',
            'status' => 'sometimes|required|string|in:active,inactive,blocked,pending,pending_kyc,suspended,banned',
        ];
    }

    /**
     * Tùy chỉnh thông báo lỗi
     */
    public function messages(): array
    {
        return [
            'email.unique' => 'Email has already been taken.',
            'phone.unique' => 'Phone number has already been taken.',
        ];
    }
}
