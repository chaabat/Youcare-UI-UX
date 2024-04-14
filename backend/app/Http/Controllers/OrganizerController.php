<?php

namespace App\Http\Controllers;

use App\Models\Annonces;
use App\Models\Postulation;
use Illuminate\Http\Request;
use PHPOpenSourceSaver\JWTAuth\Contracts\Providers\Auth;

class OrganizerController extends Controller
{
    public function store(Request $request)
    {
        $user_id = \Illuminate\Support\Facades\Auth::guard('api')->user()->id;
        $annonces = new Annonces;
        $annonces->titre = $request->titre;
        $annonces->description = $request->description;
        $annonces->type = $request->type;
        $annonces->competance = $request->competance;
        $annonces->date = $request->date;
        $annonces->location = $request->location;

        $annonces->user_id = $user_id;
        $annonces->save();

        return response()->json([
            "status" => "success",
           "message" => "annonce created successfully",
            "announcement" => $annonces
        ],201);
    }



    public function annonces(Request $request)
    {
        $user_id = \Illuminate\Support\Facades\Auth::guard('api')->user()->id;
        $annonces = Annonces::where('user_id',$user_id)->get();
        return response()->json($annonces);
    }



    public function destroy($id)
    {
        $user_id = \Illuminate\Support\Facades\Auth::guard('api')->user()->id;
        $annonce = Annonces::find($id);

        if($annonce && $annonce->user_id === $user_id){
            $annonce->delete();
            return response()->json([
                "message" => "annonce deleted successfully",
            ], 201);
    }else{
            return response()->json([
               "message" => "annonce not found or unauthorized",
            ]);
        }
    }

    public function demande()
    {
        $user_id = \Illuminate\Support\Facades\Auth::guard('api')->user()->id;
        $demande = Postulation::whereHas('annonce', function ($query) use ($user_id) {
            $query->where('user_id', $user_id);
        })->get();
        if(empty($demande)){
            return response()->json([
                "message" => "demande not found",
            ], 404);
        }else{
            return response()->json($demande);
        }
    }

    public function accepteDemande($id)
    {
        $user_id = \Illuminate\Support\Facades\Auth::guard('api')->user()->id;
        $postulation = Postulation::find($id);

        if($postulation && $postulation->annonce->user_id === $user_id) {
            if ($postulation->accepted_at === null) {
                $postulation->update(['accepted_at' => NOW()]);
                return response()->json([
                    "message" => "demande accepted successfully",
                ], 201);
            } else {
                return response()->json([
                    "message" => "demande has already been accepted",
                ], 400);
            }
        }else
            {
                return response()->json([
                    "message" => "Unauthorized",
                ], 401);
            }
    }

}
