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



Route::middleware('guest')->group(function (){
    Route::post('/login', [\App\Http\Controllers\AuthController::class, 'login'])->name('login');
    Route::post('/register/organizer',[\App\Http\Controllers\AuthController::class,'organizerRegistration']);
    Route::post('/register/volunteer',[\App\Http\Controllers\AuthController::class,'volunteerRegistration']);
});
 Route::get('/announcements/all',[\App\Http\Controllers\AnnouncementController::class,'allAnnouncements']);
Route::get('/applications/requests/all', [\App\Http\Controllers\OrganizerController::class,'allRequests']);
Route::get('/applications/all', [\App\Http\Controllers\OrganizerController::class,'allapps']);



Route::middleware('auth:api')->group(function (){
    Route::group(['middleware' => 'role:organizer'],function (){
        Route::post('/announcement/create',[\App\Http\Controllers\AnnouncementController::class,'createAnnouncement']);
        Route::put('/announcement/update/{announcement}',[\App\Http\Controllers\AnnouncementController::class,'updateAnnouncement']);
        Route::delete('/announcement/delete/{announcement}',[\App\Http\Controllers\AnnouncementController::class,'deleteAnnouncement']);
        Route::put('/application/accept/{application}',[\App\Http\Controllers\OrganizerController::class,'acceptApplication']);
        Route::put('/application/reject/{application}',[\App\Http\Controllers\OrganizerController::class,'rejectApplication']);
        });
    Route::group(['middleware' => 'role:volunteer'],function (){
        Route::post('/announcements/filter',[\App\Http\Controllers\AnnouncementController::class,'announcementsFilter']);
        Route::post('/application/create',[\App\Http\Controllers\VolunteerController::class,'applyForAnnouncement']);
    });
    Route::group(['middleware' => 'role:admin'],function (){
        Route::get('/users/ban/{user}',[\App\Http\Controllers\AdminController::class,'banUser']);
    });
    Route::post('/logout',[\App\Http\Controllers\AuthController::class,'logout']);
});

