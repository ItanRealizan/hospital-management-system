<?php

namespace App\Http\Controllers; // Ensure correct namespace

use App\Models\Patient;
use Illuminate\Http\Request;

class PatientController extends Controller
{
    public function index()
    {
        $patients = Patient::all();
        return response()->json($patients);
    }

    public function store(Request $request)
    {
        // Validation rules...

        $patient = Patient::create($request->all());

        return response()->json(['message' => 'Patient created successfully', 'patient' => $patient], 201);
    }

    public function update(Request $request, $id)
    {
        // Validation rules...
        $patient = patient::findOrFail($id);
        $patient -> update($request->all());
        return response()->json($patient,200);
    }

    public function destroy($id)
    {
        $patient = Patient::findOrFail($id);
        $patient->delete();

        return response()->json(['message' => 'Patient deleted successfully']);
    }
}
