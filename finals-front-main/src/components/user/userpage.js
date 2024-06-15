import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Homepageuser from './homepageuser';

export default function DoctorManagement() {
    const [userId, setUserId] = useState(null); // State to store user ID
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [newAppointment, setNewAppointment] = useState(null);

    useEffect(() => {
        // Retrieve user ID from localStorage
        const storedUserId = localStorage.getItem('user-id');
        setUserId(storedUserId);

        const fetchDoctors = async () => {
            try {
                let result = await fetch('http://127.0.0.1:8000/api/doctors');
                result = await result.json();
                setDoctors(result);
            } catch (error) {
                console.error('Error fetching doctors:', error);
            }
        };
        fetchDoctors();
    }, []);

    const openViewDoctor = (doctor) => {
        setSelectedDoctor(doctor);
    };

    const handleCloseModal = () => {
        setSelectedDoctor(null);
        setNewAppointment(null);
    };

    const openNewAppointmentModal = (doctor) => {
        setNewAppointment({ doctor_id: doctor.id, patient_id: userId, appointment_date: '', reason: '', status: 'Pending' });
    };

    const handleAppointmentChange = (e) => {
        const { name, value } = e.target;
        setNewAppointment({ ...newAppointment, [name]: value });
    };

    const submitNewAppointment = async (e) => {
        e.preventDefault();
        try {
            let result = await fetch('http://127.0.0.1:8000/api/appointments', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify(newAppointment)
            });

            if (result.ok) {
                result = await result.json();
                alert('Appointment successfully created');
                handleCloseModal();
            } else {
                const errorData = await result.json();
                alert('Error creating appointment: ' + JSON.stringify(errorData));
            }
        } catch (error) {
            alert('Error: ' + error.message);
        }
    };

    return (
        <div className="crud">
            <Homepageuser />
            <main className="crud-body">
                <h2>Doctor Management</h2>
                <table className='table table-striped'>
                    <thead className='thead-dark'>
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Specialization</th>
                            <th>License Number</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {doctors.map((doctor) => (
                            <tr key={doctor.id}>
                                <td>{doctor.id}</td>
                                <td>{doctor.first_name}</td>
                                <td>{doctor.last_name}</td>
                                <td>{doctor.specialization}</td>
                                <td>{doctor.license_number}</td>
                                <td>
                                    <button className="btn btn-outline-success mr-2" onClick={() => openViewDoctor(doctor)} type="button">
                                        View
                                    </button>
                                    <button className="btn btn-outline-primary" onClick={() => openNewAppointmentModal(doctor)} type="button">
                                        Schedule Appointment
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>

            {/* Modals */}
            {selectedDoctor && (
                <div className="modal show d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{selectedDoctor.first_name} {selectedDoctor.last_name} Details</h5>
                                <button type="button" className="close" onClick={handleCloseModal} aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>First Name: {selectedDoctor.first_name}</p>
                                <p>Last Name: {selectedDoctor.last_name}</p>
                                <p>Specialization: {selectedDoctor.specialization}</p>
                                <p>License Number: {selectedDoctor.license_number}</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {newAppointment && (
                <div className="modal show d-block" tabIndex="-1" role="dialog">
                    <form onSubmit={submitNewAppointment}>
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Schedule New Appointment</h5>
                                    <button type="button" className="close" onClick={handleCloseModal} aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label>Appointment Date:</label>
                                        <input type='datetime-local' className='form-control' name='appointment_date' value={newAppointment.appointment_date} onChange={handleAppointmentChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Reason:</label>
                                        <textarea className='form-control' name='reason' value={newAppointment.reason} onChange={handleAppointmentChange} required />
                                    </div>
                                    <input type='hidden' name='doctor_id' value={newAppointment.doctor_id} />
                                    <input type='hidden' name='patient_id' value={newAppointment.patient_id} />
                                    <input type='hidden' name='status' value={newAppointment.status} />
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-outline-success">Save</button>
                                    <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
