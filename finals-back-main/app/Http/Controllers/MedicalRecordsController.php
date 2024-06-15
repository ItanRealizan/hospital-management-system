<?php

namespace App\Http\Controllers;

use App\Models\MedicalRecords;
use Illuminate\Http\Request;

class MedicalRecordsController extends Controller
{
    public function index()
    {
        $records = MedicalRecords::all();
        return response()->json($records);
    }

    public function store(Request $request)
    {
        // Validation rules...
        $this->validate($request, [
            'patient_id' => 'required|integer',
            'doctor_id' => 'required|integer',
            'visit_date' => 'required|date',
            'diagnosis' => 'required|string',
            'treatment' => 'required|string',
            'notes' => 'nullable|string',
        ]);

        $record = MedicalRecords::create($request->all());

        return response()->json(['message' => 'Medical record created successfully', 'record' => $record], 201);
    }

    public function update(Request $request, $id)
    {
        // Validation rules...
        $this->validate($request, [
            'patient_id' => 'required|integer',
            'doctor_id' => 'required|integer',
            'visit_date' => 'required|date',
            'diagnosis' => 'required|string',
            'treatment' => 'required|string',
            'notes' => 'nullable|string',
        ]);

        $record = MedicalRecords::findOrFail($id);
        $record->update($request->all());

        return response()->json($record, 200);
    }

    public function destroy($id)
    {
        $record = MedicalRecords::findOrFail($id);
        $record->delete();

        return response()->json(['message' => 'Medical record deleted successfully']);
    }
}
