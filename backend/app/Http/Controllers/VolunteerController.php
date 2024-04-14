<?php

namespace App\Http\Controllers;

use App\Models\Annonces;
use App\Models\Postulation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class VolunteerController extends Controller
{
    public function allAnnonces()
    {
        $annonces = Annonces::all();
        return response()->json($annonces);
    }

    public function postule(Request $request)
    {
        try {
            $request->validate([
                'annonce_id' => 'required|exists:annonces,id',
            ]);

            $user_id = Auth::guard('api')->user()->id;

            $postulation = Postulation::create([
                'annonce_id' => $request->annonce_id,
                'user_id' => $user_id
            ]);

            return response()->json($postulation, 201);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function myPostulate()
    {
        $user = Auth::guard('api')->user()->id;
        $postulation = Postulation::all()->where('user_id',$user);
        return response()->json($postulation);
    }

    public function filtrage(Request $request)
    {
        $type = $request->input('type');

        $annonces = Annonces::where('type', $type)->get();

        return response()->json($annonces);

    }
}
