<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use App\Models\User;
use Illuminate\Support\Carbon;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index()
    {
        $activeSince = Carbon::now()->subMinutes(30);

        return Inertia::render('admin/index', [
            'totalUsers' => User::count(),
            'activeUsers' => User::where('last_login_at', '>=', $activeSince)->count(),
            'paidUsers' => Payment::where('status', 'paid')->distinct('user_id')->count('user_id'),
            'paymentCount' => Payment::where('status', 'paid')->count(),
            'totalRevenue' => Payment::where('status', 'paid')->sum('amount'),
            'recentPayments' => Payment::with('user:id,name,email')
                ->latest('paid_at')
                ->take(10)
                ->get(['id', 'user_id', 'amount', 'currency', 'status', 'provider', 'payment_reference', 'paid_at']),
        ]);
    }
}
