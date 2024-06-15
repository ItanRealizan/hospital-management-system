<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\DoctorController;
use App\Http\Controllers\AppointmentController; 
use App\Http\Controllers\MedicalRecordsController;


// Route to get authenticated user
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();     
});

// User authentication routes
Route::post('/register', [UserController::class, 'register']);
Route::post('/user_login', [UserController::class, 'login']);

// User management routes
Route::get('/users', [UserController::class, 'index']);
Route::put('/users/{id}', [UserController::class, 'update']);
Route::delete('/users/{id}', [UserController::class, 'destroy']);

// Patient management routes
Route::get('/patients', [PatientController::class, 'index']);
Route::post('/patients', [PatientController::class, 'store']);
Route::put('/patients/{id}', [PatientController::class, 'update']);
Route::delete('/patients/{id}', [PatientController::class, 'destroy']);

// Doctor management routes
Route::get('/doctors', [DoctorController::class, 'index']);
Route::post('/doctors', [DoctorController::class, 'store']);
Route::put('/doctors/{id}', [DoctorController::class, 'update']);
Route::delete('/doctors/{id}', [DoctorController::class, 'destroy']);

// Appointment management routes
Route::get('/appointments', [AppointmentController::class, 'index']);
Route::post('/appointments', [AppointmentController::class, 'store']);
Route::put('/appointments/{id}', [AppointmentController::class, 'update']);
Route::delete('/appointments/{id}', [AppointmentController::class, 'destroy']);



// Medical Records management routes
Route::get('/appointments', [AppointmentController::class, 'index']);
Route::post('/appointments', [AppointmentController::class, 'store']);
Route::put('/appointments/{id}', [AppointmentController::class, 'update']);
Route::delete('/appointments/{id}', [AppointmentController::class, 'destroy']);


Route::get('/medicalrecords', [MedicalRecordsController::class, 'index']);
Route::post('/medicalrecords', [MedicalRecordsController::class, 'store']);
Route::put('/medicalrecords/{id}', [MedicalRecordsController::class, 'update']);
Route::delete('/medicalrecords/{id}', [MedicalRecordsController::class, 'destroy']);





Route::post('/doctors/check-email', [DoctorController::class, 'checkEmail']);
Route::post('/doctors/check-email', 'DoctorController@checkEmail');

