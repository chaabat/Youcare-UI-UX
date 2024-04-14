<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{


    public function store(Request $request)
    {
        $users = new User;
        $users->fname = $request->fname;
        $users->lname = $request->lname;
        $users->role = $request->role;
        $users->competance = $request->competance;
        $users->email = $request->email;
        $users->password = $request->password;

        $users->save();
        return response()->json($users);
        $token = Auth::guard('api')->login($users);
        return response()->json([
            'status' => 'success',
            'message' => 'User created successfully',
            'user' => $users,
            'authorisation' => [
                'token' => $token,
                'type' => 'bearer',
            ]
        ]);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        $credentials = $request->only('email', 'password');

        if(!Auth::guard('api')->attempt($credentials)){
            return response()->json([
                "message" => "Unauthorized"
            ], 401);
        }

        $user = Auth::guard('api')->user();
        $token = Auth::guard('api')->claims(['role' => $user->role])->attempt($credentials);
        if(!$token) {
            return response()->json([
               "message" => "Unauthorized"
            ], 401);
        }
        return response()->json([
           'status' => 'success',
           'message' => ucfirst($user->role) . 'logged in successfully',
           'user' => $user,
           'authorization' => [
               'token' => $token,
               'type' => 'bearer'
           ]
        ]);
    }


    public function logout()
    {
        Auth::guard('api')->logout();
        return response()->json([
            'status' => 'success',
            'message' => 'Successfully logged out',
        ]);
    }
}
