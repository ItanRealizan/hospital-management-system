import React, { useState, useEffect } from 'react';

export default function PatientManagement() {
    const [patients, setPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [editPatient, setEditPatient] = useState(null);
    const [deletePatient, setDeletePatient] = useState(null);
    const [newPatient, setNewPatient] = useState(null);

    useEffect(() => {
        const fetchPatients = async () => {
            let result = await fetch('http://127.0.0.1:8000/api/patients');
            result = await result.json();
            setPatients(result);
        };
        fetchPatients();
    }, []);

    const openViewPatient = (patient) => {
        setSelectedPatient(patient);
    };

    const handleCloseModal = () => {
        setSelectedPatient(null);
        setEditPatient(null);
        setDeletePatient(null);
        setNewPatient(null);
    };

    const openEditPatient = (patient) => {
        setEditPatient(patient);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditPatient((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const submitEditedPatient = async (e) => {
        e.preventDefault();
        const { id, first_name, last_name, date_of_birth, gender, address, phone, email, emergency_contact, medical_history } = editPatient;
    
        try {
            let result = await fetch(`http://127.0.0.1:8000/api/patients/${id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify({ first_name, last_name, date_of_birth, gender, address, phone, email, emergency_contact, medical_history })
            });
    
            if (result.ok) {
                result = await result.json();
                setPatients(patients.map(patient => (patient.id === id ? result : patient)));
                handleCloseModal();
            } else {
                const errorData = await result.json();
                alert('Error updating patient: ' + JSON.stringify(errorData));
            }
        } catch (error) {
            alert('Error: ' + error.message);
        }
    };

    const openDeletePatient = (patient) => {
        setDeletePatient(patient);
    };

    const submitDeletedPatient = async (e) => {
        e.preventDefault();
        let { id } = deletePatient;

        await fetch(`http://127.0.0.1:8000/api/patients/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        });
        setPatients(patients.filter(patient => patient.id !== id));
        handleCloseModal();
    };

    const openAddPatientModal = () => {
        setNewPatient({});
    };

    const submitNewPatient = async (e) => {
        e.preventDefault();
        const { first_name, last_name, date_of_birth, gender, address, phone, email, emergency_contact, medical_history } = newPatient;

        try {
            let result = await fetch('http://127.0.0.1:8000/api/patients', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify({ first_name, last_name, date_of_birth, gender, address, phone, email, emergency_contact, medical_history })
            });

            if (result.ok) {
                result = await result.json();
                setPatients([...patients, result.patient]);
                handleCloseModal();
            } else {
                const errorData = await result.json();
                alert('Error adding patient: ' + JSON.stringify(errorData));
            }
        } catch (error) {
            alert('Error: ' + error.message);
        }
    };

    return (
        <div className='container mt-5'>
            <button className="btn btn-primary mb-3" onClick={openAddPatientModal}>Add Patient</button>
            <table className='table table-striped'>
                {/* Table Header */}
                <thead className='thead-dark'>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Date of Birth</th>
                        <th>Gender</th>
                        <th>Options</th>
                    </tr>
                </thead>
                {/* Table Body */}
                <tbody>
                    {patients.map((patient) => (
                        <tr key={patient.id}>
                            <td>{patient.id}</td>
                            <td>{patient.first_name}</td>
                            <td>{patient.last_name}</td>
                            <td>{patient.date_of_birth}</td>
                            <td>{patient.gender}</td>
                            <td>
                                <button className="btn btn-success mr-2" onClick={() => openViewPatient(patient)} type="button">
                                    View
                                </button>
                                <button className="btn btn-warning mr-2" onClick={() => openEditPatient(patient)} type="button">
                                    Edit
                                </button>
                                <button className="btn btn-danger" onClick={() => openDeletePatient(patient)} type="button">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {selectedPatient && (
                <div className="modal show d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{selectedPatient.first_name} {selectedPatient.last_name} Details</h5>
                                <button type="button" className="close" onClick={handleCloseModal} aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>First Name: {selectedPatient.first_name}</p>
                                <p>Last Name: {selectedPatient.last_name}</p>
                                <p>Date of Birth: {selectedPatient.date_of_birth}</p>
                                <p>Gender: {selectedPatient.gender}</p>
                                <p>Address: {selectedPatient.address}</p>
                                <p>Phone: {selectedPatient.phone}</p>
                                <p>Email: {selectedPatient.email}</p>
                                <p>Emergency Contact: {selectedPatient.emergency_contact}</p>
                                <p>Medical History: {selectedPatient.medical_history}</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {editPatient && (
                <div className="modal show d-block" tabIndex="-1" role="dialog">
                    <form onSubmit={submitEditedPatient}>
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Edit {editPatient.first_name} {editPatient.last_name}</h5>
                                    <button type="button" className="close" onClick={handleCloseModal} aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label>First Name:</label>
                                        <input type='text' className='form-control' name='first_name' value={editPatient.first_name} onChange={handleInputChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>Last Name:</label>
                                        <input type='text' className='form-control' name='last_name' value={editPatient.last_name} onChange={handleInputChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>Date of Birth:</label>
                                        <input type='date' className='form-control' name='date_of_birth' value={editPatient.date_of_birth} onChange={handleInputChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>Gender:</label>
                                        <select className='form-control' name='gender' value={editPatient.gender} onChange={handleInputChange}>
                                            <option value='Male'>Male</option>
                                            <option value='Female'>Female</option>
                                            <option value='Other'>Other</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Address:</label>
                                        <input type='text' className='form-control' name='address' value={editPatient.address} onChange={handleInputChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>Phone:</label>
                                        <input type='text' className='form-control' name='phone' value={editPatient.phone} onChange={handleInputChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>Email:</label>
                                        <input type='email' className='form-control' name='email' value={editPatient.email} onChange={handleInputChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>Emergency Contact:</label>
                                        <input type='text' className='form-control' name='emergency_contact' value={editPatient.emergency_contact} onChange={handleInputChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>Medical History:</label>
                                        <textarea className='form-control' name='medical_history' value={editPatient.medical_history} onChange={handleInputChange}></textarea>
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
            {deletePatient && (
                <div className="modal show d-block" tabIndex="-1" role="dialog">
                    <form onSubmit={submitDeletedPatient}>
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Delete {deletePatient.first_name} {deletePatient.last_name}?</h5>
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
            {newPatient && (
    <div className="modal show d-block" tabIndex="-1" role="dialog">
        <form onSubmit={submitNewPatient}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Add New Patient</h5>
                        <button type="button" className="close" onClick={handleCloseModal} aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            <label>First Name:</label>
                            <input type='text' className='form-control' name='first_name' value={newPatient.first_name || ''} onChange={handleNewPatientInputChange} required />
                        </div>
                        <div className="form-group">
                            <label>Last Name:</label>
                            <input type='text' className='form-control' name='last_name' value={newPatient.last_name || ''} onChange={handleNewPatientInputChange} required />
                        </div>
                        <div className="form-group">
                            <label>Date of Birth:</label>
                            <input type='date' className='form-control' name='date_of_birth' value={newPatient.date_of_birth || ''} onChange={handleNewPatientInputChange} required />
                        </div>
                        <div className="form-group">
                            <label>Gender:</label>
                            <select className='form-control' name='gender' value={newPatient.gender || ''} onChange={handleNewPatientInputChange} required>
                                <option value=''>Select Gender</option>
                                <option value='Male'>Male</option>
                                <option value='Female'>Female</option>
                                <option value='Other'>Other</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Address:</label>
                            <input type='text' className='form-control' name='address' value={newPatient.address || ''} onChange={handleNewPatientInputChange} required />
                        </div>
                        <div className="form-group">
                            <label>Phone:</label>
                            <input type='text' className='form-control' name='phone' value={newPatient.phone || ''} onChange={handleNewPatientInputChange} required />
                        </div>
                        <div className="form-group">
                            <label>Email:</label>
                            <input type='email' className='form-control' name='email' value={newPatient.email || ''} onChange={handleNewPatientInputChange} required />
                        </div>
                        <div className="form-group">
                            <label>Emergency Contact:</label>
                            <input type='text' className='form-control' name='emergency_contact' value={newPatient.emergency_contact || ''} onChange={handleNewPatientInputChange} required />
                        </div>
                        <div className="form-group">
                            <label>Medical History:</label>
                            <textarea className='form-control' name='medical_history' value={newPatient.medical_history || ''} onChange={handleNewPatientInputChange}></textarea>
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
