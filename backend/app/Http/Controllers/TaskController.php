<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Auth::user()->tasks;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        $validated = $request->validated();

        $task = Auth::user()->tasks()->create($validated);

        return response()->json($task, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        if (! Gate::allows('view', $task)) {
            abort(403, '権限がありません。');
        }
        return response()->json($task);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        if (! Gate::allows('update', $task)) {
            abort(403, '権限がありません。');
        }

        $validated = $request->validated();

        $task->update($validated);

        return response()->json($task);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        if (! Gate::allows('delete', $task)) {
            abort(403, '権限がありません。');
        }

        $task->delete();

        return response()->json(null, 204);
    }
}
