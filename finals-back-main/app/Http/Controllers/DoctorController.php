<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Doctor;

class DoctorController extends Controller // Rename the class to DoctorController
{
    public function index()
    {
        $doctors = Doctor::all();
        return response()->json($doctors);
    }

    public function store(Request $request)
    {
        // Validation rules...

        $doctor = Doctor::create($request->all());

        return response()->json(['message' => 'Doctor created successfully', 'doctor' => $doctor], 201);
    }

    public function update(Request $request, $id)
    {
        // Validation rules...
        $doctor = Doctor::findOrFail($id);
        $doctor->update($request->all());
        return response()->json($doctor, 200);
    }

    public function destroy($id)
    {
        $doctor = Doctor::findOrFail($id);
        $doctor->delete();

        return response()->json(['message' => 'Doctor deleted successfully']);
    }
    public function checkEmail(Request $request)
    {
        $email = $request->input('email');

        // Perform a database query to check if a doctor exists with the provided email
        $doctor = Doctor::where('email', $email)->first();

        if ($doctor) {
            // If a doctor is found with the provided email, return the doctor's ID
            return response()->json(['exists' => true, 'id' => $doctor->id]);
        } else {
            // If no doctor is found, return an error response
            return response()->json(['error' => 'Doctor not found with the provided email'], 404);
        }
    }
}
