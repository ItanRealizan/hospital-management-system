import React, { useState, useEffect } from 'react';
import Homepagereceptionist from './homepagereceptionist';

const DoctorManagement = () => {
    const [appointments, setAppointments] = useState([]);
    const [editAppointment, setEditAppointment] = useState(null);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/appointments');
                const data = await response.json();
                setAppointments(data);
            } catch (error) {
                console.error('Error fetching appointments:', error);
            }
        };
        fetchAppointments();
    }, []);

    const openEditModal = (appointment) => {
        setEditAppointment(appointment);
    };

    const closeEditModal = () => {
        setEditAppointment(null);
    };

    const saveEditedAppointment = async (editedData) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/appointments/${editedData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedData),
            });
            if (response.ok) {
                const updatedAppointment = await response.json();
                setAppointments((prevAppointments) =>
                    prevAppointments.map((appointment) =>
                        appointment.id === updatedAppointment.id ? updatedAppointment : appointment
                    )
                );
            } else {
                console.error('Error updating appointment:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating appointment:', error);
        }
    };

    const EditAppointmentModal = ({ appointment, onSave, onClose }) => {
        const [editedAppointment, setEditedAppointment] = useState(appointment);

        const handleAppointmentChange = (e) => {
            const { name, value } = e.target;
            setEditedAppointment({ ...editedAppointment, [name]: value });
        };

        const handleSave = () => {
            onSave(editedAppointment);
            onClose();
        };

        return (
            <div className="modal show d-block" tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Edit Appointment</h5>
                            <button type="button" className="close" onClick={onClose} aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label>Appointment Date:</label>
                                <input
                                    type='datetime-local'
                                    className='form-control'
                                    name='appointment_date'
                                    value={editedAppointment.appointment_date}
                                    onChange={handleAppointmentChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Status:</label>
                                <select
                                    className='form-control'
                                    name='status'
                                    value={editedAppointment.status}
                                    onChange={handleAppointmentChange}
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Scheduled">Scheduled</option>
                                    <option value="Complete">Complete</option>
                                    <option value="Cancelled">Cancelled</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Reason:</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    name='reason'
                                    value={editedAppointment.reason}
                                    onChange={handleAppointmentChange}
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleSave}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="crud">
            <Homepagereceptionist />
            <main className="crud-body">
                <h1 style={{ fontFamily: 'Arial, sans-serif', fontSize: '2rem' }}>Appointments</h1>
                <table className='table table-striped'>
                    <thead className='thead-dark'>
                        <tr>
                            <th>ID</th>
                            <th>Patient ID</th>
                            <th>Doctor ID</th>
                            <th>Appointment Date</th>
                            <th>Status</th>
                            <th>Reason</th>
                            <th>Options</th>
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
                                    <button className="btn btn-primary" onClick={() => openEditModal(appointment)}>Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>

            {editAppointment && (
                <EditAppointmentModal
                    appointment={editAppointment}
                    onSave={saveEditedAppointment}
                    onClose={closeEditModal}
                />
            )}
        </div>
    );
};

export default DoctorManagement;
