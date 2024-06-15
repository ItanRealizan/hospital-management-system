<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMedicalRecordsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('medical_records', function (Blueprint $table) {
            $table->id(); // Unique identifier for the medical record
            $table->unsignedBigInteger('patient_id'); // Reference to the patient
            $table->unsignedBigInteger('doctor_id'); // Reference to the doctor
            $table->date('visit_date'); // Date of the patient's visit
            $table->string('diagnosis'); // Diagnosis made by the doctor
            $table->text('treatment'); // Treatment prescribed to the patient
            $table->text('notes')->nullable(); // Additional notes by the doctor
            $table->timestamps(); // created_at and updated_at

            // Foreign key constraints
            $table->foreign('patient_id')->references('id')->on('patients')->onDelete('cascade');
            $table->foreign('doctor_id')->references('id')->on('doctors')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('medical_records');
    }
}
