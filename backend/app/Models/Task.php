<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable = [
        'user_id',
        'title',
        'project_name',
        'memo',
        'current_status',
    ];

    protected $attributes = [
        'current_status' => 'unstarted',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
