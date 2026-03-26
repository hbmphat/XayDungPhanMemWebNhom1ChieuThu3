<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\StoreUserRequest;
use App\Http\Requests\User\UpdateUserRequest;
use App\Http\Resources\User\UserCollection;
use App\Http\Resources\User\UserResource;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return $this->successReponse([
            'data' => new UserCollection(User::paginate(10)),
            'message' => 'Danh sách người dùng'
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $validated = $request->validated();
        $validated['password'] = Hash::make($validated['password']);
        $user = User::create($validated);

        return $this->successReponse([
            'data' => new UserResource($user),
            'message' => 'Tạo thành công',
            'code' => 201
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return $this->successReponse([
            'data' => new UserResource($user),
            'message' => 'Thông tin người dùng',
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $validated = $request->validated();

        if (!empty($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        } else {
            unset($validated['password']);
        }

        $user->update($validated);


        return $this->successReponse([
            'data' => new UserResource($user),
            'message' => 'Cập nhật thành công',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();
        return $this->successReponse([
            'message' => 'Xóa thành công'
        ]);
    }
}
