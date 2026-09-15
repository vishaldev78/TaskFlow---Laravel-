<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $myPosts = Post::where('user_id', Auth::id())->count();

        $pendingPosts = Post::where('user_id', Auth::id())
            ->where('status', 'pending')
            ->count();

        $completedPosts = Post::where('user_id', Auth::id())
            ->where('status', 'completed')
            ->count();

        $recentPosts = Post::where(
            'user_id',
            Auth::id()
        )
            ->latest()
            ->take(5)
            ->get();

        return Inertia::render('dashboard', [
            'totalPosts' => $myPosts,
            'myPosts' => $myPosts,
            'pendingPosts' => $pendingPosts,
            'completedPosts' => $completedPosts,
            'recentPosts' => $recentPosts,
        ]);
    }
}