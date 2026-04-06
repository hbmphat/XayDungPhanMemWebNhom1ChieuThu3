<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\StoreUserRequest;
use App\Http\Requests\User\UpdateUserRequest;
use App\Http\Resources\User\UserCollection;
use App\Http\Resources\User\UserResource;
use App\Models\User;
use App\Services\User\UserService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

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
    public function index(Request $request): JsonResponse
    {
        $perPage = $this->getPerPage();
        $filters = $request->all();
        $users = $this->userService->getPaginatedUsers($perPage, $filters);
        return $this->successResponse(new UserCollection($users), 'User list');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request): JsonResponse
    {
        $validated = $request->validated();
        $user = $this->userService->createUser($validated);
        return $this->successResponse(new UserResource($user), 'Created successfully', 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user): JsonResponse
    {
        $result = $this->userService->getUser($user);
        return $this->successResponse(new UserResource($result), 'User information');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user): JsonResponse
    {
        $validated = $request->validated();
        $user = $this->userService->updateUser($validated, $user);
        return $this->successResponse(new UserResource($user), 'Updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user): JsonResponse
    {
        // $user = $this->currentUser();
        // if ($user->role !== 'admin') {
        //     return $this->unauthorized('Chỉ Admin mới có quyền xóa tài khoản');
        // }

        $this->userService->deleteUser($user);
        return $this->successResponse(null, 'Deleted successfully');
    }
}
