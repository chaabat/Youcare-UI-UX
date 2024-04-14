<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UsersController extends Controller
{



    public function index()
    {
        $users = User::all();
        return response()->json($users);
    }

    public function destroy($id)
    {
        if(User::where('id', $id)->exists()){
            $users = User::find($id);
            $users->delete();

            return response()->json([
                "message" => "user Deleted Successfully"
            ], 201);
        }else{
            return response()->json([
                "message" => "user does not deleted"
            ],404);
        }
    }
}
