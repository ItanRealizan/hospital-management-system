import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Homepage from './homepage'; // Assuming Homepage component is in the same directory

export default function DoctorManagement() {
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [editDoctor, setEditDoctor] = useState(null);
    const [deleteDoctor, setDeleteDoctor] = useState(null);
    const [newDoctor, setNewDoctor] = useState(null);

    useEffect(() => {
        const fetchDoctors = async () => {
            let result = await fetch('http://127.0.0.1:8000/api/doctors');
            result = await result.json();
            setDoctors(result);
        };
        fetchDoctors();
    }, []);
    
    const handleNewDoctorInputChange = (e) => {
        const { name, value } = e.target;
        setNewDoctor((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const openViewDoctor = (doctor) => {
        setSelectedDoctor(doctor);
    };

    const handleCloseModal = () => {
        setSelectedDoctor(null);
        setEditDoctor(null);
        setDeleteDoctor(null);
        setNewDoctor(null);
    };

    const openEditDoctor = (doctor) => {
        setEditDoctor(doctor);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditDoctor((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const submitEditedDoctor = async (e) => {
        e.preventDefault();
        const { id, first_name, last_name, specialization, license_number, phone, email } = editDoctor;
    
        try {
            let result = await fetch(`http://127.0.0.1:8000/api/doctors/${id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify({ first_name, last_name, specialization, license_number, phone, email })
            });
    
            if (result.ok) {
                result = await result.json();
                setDoctors(doctors.map(doctor => (doctor.id === id ? result : doctor)));
                handleCloseModal();
            } else {
                const errorData = await result.json();
                alert('Error updating doctor: ' + JSON.stringify(errorData));
            }
        } catch (error) {
            alert('Error: ' + error.message);
        }
    };

    const openDeleteDoctor = (doctor) => {
        setDeleteDoctor(doctor);
    };

    const submitDeletedDoctor = async (e) => {
        e.preventDefault();
        let { id } = deleteDoctor;

        await fetch(`http://127.0.0.1:8000/api/doctors/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        });
        setDoctors(doctors.filter(doctor => doctor.id !== id));
        handleCloseModal();
    };

    const openAddDoctorModal = () => {
        setNewDoctor({});
    };

    const submitNewDoctor = async (e) => {
        e.preventDefault();
        const { first_name, last_name, specialization, license_number, phone, email } = newDoctor;

        try {
            let result = await fetch('http://127.0.0.1:8000/api/doctors', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify({ first_name, last_name, specialization, license_number, phone, email })
            });

            if (result.ok) {
                result = await result.json();
                setDoctors([...doctors, result.doctor]);
                handleCloseModal();
            } else {
                const errorData = await result.json();
                alert('Error adding doctor: ' + JSON.stringify(errorData));
            }
        } catch (error) {
            alert('Error: ' + error.message);
        }
    };

    const modalStyle = {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#fff',
        padding: '20px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        borderRadius: '5px',
        maxWidth: '600px',
        width: '100%',
        overflow: 'auto',
        maxHeight: '80%'
    };

    const buttonStyle = {
        backgroundColor: '#28a745', // Bootstrap btn-success color
        marginRight: '0.5rem', // Adjust margin as needed
        color: '#fff', // Text color
        border: 'none', // No border
    };
    
    const editButtonStyle = {
        backgroundColor: '#ffc107', // Bootstrap btn-warning color
        marginRight: '0.5rem', // Adjust margin as needed
        color: '#fff', // Text color
        border: 'none', // No border
    };
    
    const deleteButtonStyle = {
        backgroundColor: '#dc3545', // Bootstrap btn-danger color
        color: '#fff', // Text color
        border: 'none', // No border
    };

    return (
        <div className="crud">
            <Homepage />
            <main className="crud-body">
                <button className="btn btn-primary mb-3" onClick={openAddDoctorModal}>Add Doctor</button>
                <table className='table table-striped'>
                    {/* Table Header */}
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
                    {/* Table Body */}
                    <tbody>
                        {doctors.map((doctor) => (
                            <tr key={doctor.id}>
                                <td>{doctor.id}</td>
                                <td>{doctor.first_name}</td>
                                <td>{doctor.last_name}</td>
                                <td>{doctor.specialization}</td>
                                <td>{doctor.license_number}</td>
                                <td>
                                <button className="btn btn-info" style={buttonStyle} onClick={() => openViewDoctor(doctor)} type="button">
                                    View
                                </button>
                                <button className="btn btn-primary" style={editButtonStyle} onClick={() => openEditDoctor(doctor)} type="button">
                                    Edit
                                </button>
                                <button className="btn btn-secondary" style={deleteButtonStyle} onClick={() => openDeleteDoctor(doctor)} type="button">
                                    Delete
                                </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>

            {selectedDoctor && (
                <div className="modal show d-block" tabIndex="-1" role="dialog" style={modalStyle}>
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
                                {/* Add additional fields as needed */}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {editDoctor && (
                <div className="modal show d-block" tabIndex="-1" role="dialog" style={modalStyle}>
                    <form onSubmit={submitEditedDoctor}>
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Edit {editDoctor.first_name} {editDoctor.last_name}</h5>
                                    <button type="button" className="close" onClick={handleCloseModal} aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label>First Name:</label>
                                        <input type='text' className='form-control' name='first_name' value={editDoctor.first_name} onChange={handleInputChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>Last Name:</label>
                                        <input type='text' className='form-control' name='last_name' value={editDoctor.last_name} onChange={handleInputChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>Specialization:</label>
                                        <input type='text' className='form-control' name='specialization' value={editDoctor.specialization} onChange={handleInputChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>License Number:</label>
                                        <input type='text' className='form-control' name='license_number' value={editDoctor.license_number} onChange={handleInputChange} />
                                    </div>
                                    {/* Add additional fields as needed */}
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-success">Save</button>
                                    <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
                                </div>
                            </div>
                        </div>
                    </form>
                    </div>
            )}

            {deleteDoctor && (
                <div className="modal show d-block" tabIndex="-1" role="dialog" style={modalStyle}>
                    <form onSubmit={submitDeletedDoctor}>
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Delete {deleteDoctor.first_name} {deleteDoctor.last_name}?</h5>
                                    <button type="button" className="close" onClick={handleCloseModal} aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-danger">Yes</button>
                                    <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>No</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            )}

            {newDoctor && (
                <div className="modal show d-block" tabIndex="-1" role="dialog" style={modalStyle}>
                    <form onSubmit={submitNewDoctor}>
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Add New Doctor</h5>
                                    <button type="button" className="close" onClick={handleCloseModal} aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label>First Name:</label>
                                        <input type='text' className='form-control' name='first_name' value={newDoctor.first_name || ''} onChange={handleNewDoctorInputChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Last Name:</label>
                                        <input type='text' className='form-control' name='last_name' value={newDoctor.last_name || ''} onChange={handleNewDoctorInputChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Specialization:</label>
                                        <input type='text' className='form-control' name='specialization' value={newDoctor.specialization || ''} onChange={handleNewDoctorInputChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label>License Number:</label>
                                        <input type='text' className='form-control' name='license_number' value={newDoctor.license_number || ''} onChange={handleNewDoctorInputChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Phone:</label>
                                        <input type='text' className='form-control' name='phone' value={newDoctor.phone || ''} onChange={handleNewDoctorInputChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Email:</label>
                                        <input type='email' className='form-control' name='email' value={newDoctor.email || ''} onChange={handleNewDoctorInputChange} required />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-success">Save</button>
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
