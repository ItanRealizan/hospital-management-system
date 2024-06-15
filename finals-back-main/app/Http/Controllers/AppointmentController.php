<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use Illuminate\Http\Request;

class AppointmentController extends Controller
{
    /**
     * Display a listing of the appointments.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $appointments = Appointment::all();
        return response()->json($appointments);
    }

    /**
     * Store a newly created appointment in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'patient_id' => 'required',
            'doctor_id' => 'required',
            'appointment_date' => 'required|date',
            'status' => 'nullable',
            'reason' => 'nullable',
        ]);

        $appointment = Appointment::create($request->all());

        return response()->json($appointment, 201);
    }

    /**
     * Display the specified appointment.
     *
     * @param  \App\Models\Appointment  $appointment
     * @return \Illuminate\Http\Response
     */
    public function show(Appointment $appointment)
    {
        return response()->json($appointment);
    }

    /**
     * Update the specified appointment in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Appointment  $appointment
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
       // Validation rules...
       $appointment = appointment::findOrFail($id);
       $appointment -> update($request->all());
       return response()->json($appointment,200);
    }

    /**
     * Remove the specified appointment from storage.
     *
     * @param  \App\Models\Appointment  $appointment
     * @return \Illuminate\Http\Response
     */
    public function destroy(Appointment $appointment)
    {
        $appointment->delete();

        return response()->json(null, 204);
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
