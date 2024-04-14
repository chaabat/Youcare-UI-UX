<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('login', [\App\Http\Controllers\AuthController::class, 'login']);
Route::post('logout', [\App\Http\Controllers\AuthController::class, 'logout']);
Route::post('/register', [\App\Http\Controllers\AuthController::class, 'store']);
 

Route::get('/users', [\App\Http\Controllers\UsersController::class, 'index']);
Route::delete('/users/{id}', [\App\Http\Controllers\UsersController::class, 'destroy']);


Route::post('annonces', [\App\Http\Controllers\OrganizerController::class, 'store']);
Route::get('annonces', [\App\Http\Controllers\OrganizerController::class, 'annonces']);
Route::get('demande', [\App\Http\Controllers\OrganizerController::class, 'demande']);
Route::post('accepteDemande/{id}', [\App\Http\Controllers\OrganizerController::class, 'accepteDemande']);
Route::delete('annonces/{id}', [\App\Http\Controllers\OrganizerController::class, 'destroy']);



Route::get('allAnnonces', [\App\Http\Controllers\VolunteerController::class, 'allAnnonces']);
Route::post('postule', [\App\Http\Controllers\VolunteerController::class, 'postule']);
Route::get('myPostulate', [\App\Http\Controllers\VolunteerController::class, 'myPostulate']);
Route::get('filtrage', [\App\Http\Controllers\VolunteerController::class, 'filtrage']);
