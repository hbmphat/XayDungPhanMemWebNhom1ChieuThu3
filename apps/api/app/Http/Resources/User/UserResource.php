<?php

namespace App\Http\Resources\User;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'user_id' => $this->id,
            'status' => $this->status,
            'user_name' => $this->user_name,
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,

            // full_name an toàn, không lỗi khi null
            'full_name' => trim(($this->first_name ?? '') . ' ' . ($this->last_name ?? '')),

            'email' => $this->email,

            // tránh lỗi 500 khi date_of_birth = null
            'date_of_birth' => $this->date_of_birth
                ? $this->date_of_birth->format('Y-m-d')
                : null,

            'address' => $this->address,
            'phone' => $this->phone,

            // tránh lỗi khi created_at / updated_at null (hiếm nhưng nên an toàn)
            'created_at' => $this->created_at
                ? $this->created_at->format('d-m-Y H:i')
                : null,

            'updated_at' => $this->updated_at
                ? $this->updated_at->format('d-m-Y H:i')
                : null,
        ];
    }
}
