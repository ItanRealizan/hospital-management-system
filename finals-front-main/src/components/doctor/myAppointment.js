import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Homepagedoctor from './homepageDoctor'; 

export default function DoctorManagement() {
    const [appointments, setAppointments] = useState([]);
    const [doctorId, setDoctorId] = useState(null);
    const navigate = useNavigate();
    const loggedInEmail = localStorage.getItem('user-email'); // Get logged-in user's email
    console.log('Logged in email:', loggedInEmail);

    // Inside your useEffect hook
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch doctor details
                const doctorResponse = await fetch(`http://127.0.0.1:8000/api/doctors?email=${loggedInEmail}`);
                const doctorData = await doctorResponse.json();
    
                if (doctorData.length > 0) {
                    let doctorId = null;
    
                    // Iterate through each doctor object in doctorData
                    for (let i = 0; i < doctorData.length; i++) {
                        // Check if the email of the current doctor matches the loggedInEmail
                        if (doctorData[i].email === loggedInEmail) {
                            // If match found, set the doctorId and break the loop
                            doctorId = doctorData[i].id;
                            break;
                        }
                    }
    
                    if (doctorId !== null) {
                        // Fetch appointments for the doctor
                        const appointmentResponse = await fetch('http://127.0.0.1:8000/api/appointments');
                        const appointmentData = await appointmentResponse.json();
    
                        // Filter appointments based on logged-in doctor's ID
                        const filteredAppointments = appointmentData.filter(appointment => appointment.doctor_id === doctorId);
                        setAppointments(filteredAppointments);
                    } else {
                        console.error('No doctor found with the provided email.');
                        // If no doctor found with the provided email, handle accordingly
                        // For example, redirect the user to a page to register as a doctor
                        navigate('/register-as-doctor');
                    }
                } else {
                    console.error('No doctors found in the database.');
                    // Handle the case where no doctors are found in the database
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        if (loggedInEmail) {
            fetchData();
        }
    }, [loggedInEmail]);

    return (
        <div className="crud">
        <Homepagedoctor />
        <main className="crud-body">
                <h1>Appointments</h1>
                <table className='table table-striped'>
                    <thead className='thead-dark'>
                        <tr>
                            <th>ID</th>
                            <th>Patient ID</th>
                            <th>Doctor ID</th>
                            <th>Appointment Date</th>
                            <th>Status</th>
                            <th>Reason</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((appointment) => (
                            <tr key={appointment.id}>
                                <td>{appointment.id}</td>
                                <td>{appointment.patient_id}</td>
                                <td>{appointment.doctor_id}</td>
                                <td>{new Date(appointment.appointment_date).toLocaleString()}</td>
                                <td>{appointment.status}</td>
                                <td>{appointment.reason}</td>s
                                <td>
                                    {/* Add options here */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>
        </div>
    );
}
