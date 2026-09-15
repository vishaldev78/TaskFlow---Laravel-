<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\AdminController;


// Web Routes
Route::inertia('/', 'welcome')->name('home');


// Auth routes
Route::middleware(['auth', 'verified'])->group(function () {

  // Dashboard
  Route::get('dashboard', [DashboardController::class, 'index',])->name('dashboard');

  Route::get('admin', [AdminController::class, 'index'])
    ->middleware('admin')
    ->name('admin.dashboard');

  // Posts
  Route::resource('posts', PostController::class);
  Route::patch('posts/{post}/status', [PostController::class, 'updateStatus'])
    ->name('posts.status');
});


require __DIR__ . '/settings.php';
