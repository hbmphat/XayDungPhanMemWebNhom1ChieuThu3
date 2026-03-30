<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\StoreUserRequest;
use App\Http\Requests\User\UpdateUserRequest;
use App\Http\Resources\User\UserCollection;
use App\Http\Resources\User\UserResource;
use App\Models\User;
use App\Services\User\UserService;

class UserController extends Controller
{

    protected $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = $this->userService->getPaginatedUsers();
        return $this->successResponse(new UserCollection($users), 'Danh sách người dùng');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $validated = $request->validated();
        $user = $this->userService->createUser($validated);
        return $this->successResponse(new UserResource($user), 'Tạo thành công', 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        $result = $this->userService->getUser($user);
        return $this->successResponse(new UserResource($result), 'Thông tin người dùng');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $validated = $request->validated();
        $user = $this->userService->updateUser($validated, $user);
        return $this->successResponse(new UserResource($user), 'Cập nhật thành công');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $this->userService->deleteUser($user);
        return $this->successResponse(null, 'Xóa thành công');
    }
}
