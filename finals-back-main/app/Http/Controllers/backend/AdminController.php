<?php

namespace App\Http\Controllers\backend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Auth;

class AdminController extends Controller
{
    public function login(Request $req)
    {
        $credentials = $req->only('email','password');
        if(Auth::guard('admin')->attempt($credentials, $req->remember))
        {
            return redirect()->route('dashboard');
        }
            return redirect()->route('admin.login')->with('status','Failed to login');
    }
    public function logout(Request $req)
    {
        Auth::guard('admin')->logout();
        $req->session()->invalidate();
        $req->session()->regenerateToken();
        $req->session()->put('status', 'Successfully logout!');
        return redirect()->route('admin.login');
    }
}