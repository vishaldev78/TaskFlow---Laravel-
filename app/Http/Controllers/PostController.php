<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PostController extends Controller
{
  // Show all posts
  public function index()
  {
    $posts = Post::where('user_id', Auth::id())
      ->latest()
      ->get();

    return Inertia::render('posts/index', [
      'posts' => $posts,
    ]);
  }

  // Show create form
  public function create()
  {
    return Inertia::render('posts/create');
  }

  // Save new post
  public function store(Request $request)
  {
    $user = Auth::user();

    if (Post::where('user_id', $user->id)->count() >= 5
      && ! Payment::where('user_id', $user->id)->where('status', 'paid')->exists()) {
      return back()->withErrors([
        'title' => 'Your Free plan allows up to 5 tasks. Upgrade your plan to create more.',
      ]);
    }

    $request->validate([
      'title' => 'required|string|max:255',
      'content' => 'required|string',
    ]);

    Post::create([
      'user_id' => $user->id,
      'title' => $request->title,
      'content' => $request->input('content'),
    ]);

    return redirect()
      ->route('posts.index')
      ->with('success', 'Post created successfully!');
  }

  // Show edit form
  public function edit(Post $post)
  {
    abort_unless($post->user_id === Auth::id(), 403);

    return Inertia::render('posts/edit', [
      'post' => $post,
    ]);
  }

  // Update post
  public function update(Request $request, Post $post)
  {
    abort_unless($post->user_id === Auth::id(), 403);

    $request->validate([
      'title' => 'required|string|max:255',
      'content' => 'required|string',
    ]);

    $post->update($request->only(['title', 'content']));

    return redirect()
      ->route('posts.index')
      ->with('success', 'Post updated successfully!');
  }

  // Delete post
  public function destroy(Post $post)
  {
    abort_unless($post->user_id === Auth::id(), 403);

    $post->delete();

    return redirect()
      ->route('posts.index')
      ->with('success', 'Post deleted successfully!');
  }

  public function updateStatus(Post $post)
  {
    abort_unless($post->user_id === Auth::id(), 403);

    $post->update([
      'status' => $post->status === 'completed' ? 'pending' : 'completed',
    ]);

    return back();
  }
}
