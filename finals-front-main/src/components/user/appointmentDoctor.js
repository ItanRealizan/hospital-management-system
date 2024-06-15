import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Homepageuser from './homepageuser';

export default function DoctorManagement() {
    const [appointments, setAppointments] = useState([]);
    const navigate = useNavigate();
    const loggedInEmail = localStorage.getItem('user-email'); // Get logged-in user's email
    const userId = Number(localStorage.getItem('user-id')); // Get logged-in user's ID and convert it to a number
    console.log('Logged in email:', loggedInEmail);
    console.log('Logged in user ID:', userId);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch appointments
                const appointmentResponse = await fetch('http://127.0.0.1:8000/api/appointments');
                const appointmentData = await appointmentResponse.json();

                console.log('Fetched appointment data:', appointmentData);

                if (appointmentData.length > 0) {
                    let userAppointments = [];

                    // Filter appointments for the logged-in user
                    userAppointments = appointmentData.filter(appointment => appointment.patient_id === userId);

                    if (userAppointments.length > 0) {
                        setAppointments(userAppointments);
                    } else {
                        console.error('No appointments found for the provided user ID.');
                    }
                } else {
                    console.error('No appointments found in the database.');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (userId) {
            fetchData();
        }
    }, [userId]);

    const deleteAppointment = async (appointmentId) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/appointments/${appointmentId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                // Remove the deleted appointment from the state
                setAppointments(appointments.filter(appointment => appointment.id !== appointmentId));
            } else {
                console.error('Failed to delete the appointment.');
            }
        } catch (error) {
            console.error('Error deleting the appointment:', error);
        }
    };

    const handleViewAppointment = (appointmentId) => {
        // Redirect to view appointment page with appointmentId
        navigate(`/view-appointment/${appointmentId}`);
    };

    return (
        <div className="crud">
            <Homepageuser />
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
                            <th>Options</th> {/* Changed "Option" to "Options" */}
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
                                <td>{appointment.reason}</td>
                                <td>
                                    <button
                                        className="btn btn-outline-info btn-sm me-2" // Sky blue color for "View" button with extra space
                                        onClick={() => handleViewAppointment(appointment.id)}
                                        type="button"
                                    >
                                        View
                                    </button>
                                    <button
                                        className="btn btn-outline-danger btn-sm" // Red outline for "Cancel" button
                                        onClick={() => deleteAppointment(appointment.id)}
                                        type="button"
                                    >
                                        Cancel
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>
        </div>
    );
}
