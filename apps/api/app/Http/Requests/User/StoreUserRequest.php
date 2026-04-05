<?php

namespace App\Http\Requests\User;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreUserRequest extends FormRequest
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
        return [
            'user_name' => [
                'required',
                'string',
                'min:4',
                'max:50',
                'unique:users,user_name'
            ],
            'first_name' => 'required|string|min:4|max:50',
            'last_name'  => 'required|string|min:4|max:50',
            'email'      => [
                'required',
                'string',
                'email',
                'max:255',
                'unique:users,email'
            ],
            'phone'      => [
                'required',
                'string',
                'regex:/^(0|84)(3|5|7|8|9)[0-9]{8}$/',
                'unique:users,phone'
            ],
            'password'   => 'required|string|min:8|max:50',
            'address'    => 'required|string|min:2|max:100',
            'date_of_birth' => 'required|date|before_or_equal:today',
            'role'       => 'required|string|in:admin,customer',
            'status'     => 'required|string|in:active,inactive',
        ];
    }
    /**
     * Tùy chỉnh thông báo lỗi
     */
    public function messages(): array
    {
        return [
            'user_name.unique' => 'Username has already been taken.',
            'email.unique' => 'Email has already been taken.',
        ];
    }
}
