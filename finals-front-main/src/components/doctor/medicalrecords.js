import React, { useState, useEffect } from 'react';
import Homepagedoctor from './homepageDoctor'; 

export default function MedicalRecordsManagement() {
    const [records, setRecords] = useState([]);
    const [patients, setPatients] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [editRecord, setEditRecord] = useState(null);
    const [deleteRecord, setDeleteRecord] = useState(null);
    const [newRecord, setNewRecord] = useState(null);

    const userId = Number(localStorage.getItem('user-id')); // Get logged-in user's ID and convert it to a number
    const userEmail = localStorage.getItem('user-email'); // Assuming user's email is stored in localStorage
    const userRole = localStorage.getItem('user-role'); // Get logged-in user's role
  
    console.log('Logged in user ID:', userId);
    console.log('Logged in user email:', userEmail);
    console.log('Logged in user Role:', userRole);

    useEffect(() => {
        const fetchRecords = async () => {
            let result = await fetch('http://127.0.0.1:8000/api/medicalrecords');
            result = await result.json();
            setRecords(result);
        };
        fetchRecords();
    }, []);

    useEffect(() => {
        const fetchPatients = async () => {
            let result = await fetch('http://127.0.0.1:8000/api/patients');
            result = await result.json();
            setPatients(result);
        };
        fetchPatients();
    }, []);

    useEffect(() => {
        const fetchUsers = async () => {
            let result = await fetch('http://127.0.0.1:8000/api/users');
            result = await result.json();
            setUsers(result);
        };
        fetchUsers();
    }, []);

    const handleNewRecordInputChange = (e) => {
        const { name, value } = e.target;
        setNewRecord((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handlePatientSelect = (e) => {
        const patientId = e.target.value;
        setNewRecord((prevState) => ({
            ...prevState,
            patient_id: patientId
        }));
    };

    const openViewRecord = (record) => {
        setSelectedRecord(record);
    };

    const handleCloseModal = () => {
        setSelectedRecord(null);
        setEditRecord(null);
        setDeleteRecord(null);
        setNewRecord(null);
    };

    const openEditRecord = (record) => {
        setEditRecord(record);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditRecord((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const submitEditedRecord = async (e) => {
        e.preventDefault();
        const { id, patient_id, visit_date, diagnosis, treatment, notes } = editRecord;

        try {
            let result = await fetch(`http://127.0.0.1:8000/api/medicalrecords/${id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify({ patient_id, doctor_id: userId, visit_date, diagnosis, treatment, notes })
            });

            if (result.ok) {
                result = await result.json();
                setRecords(records.map(record => (record.id === id ? result : record)));
                handleCloseModal();
            } else {
                const errorData = await result.json();
                alert('Error updating record: ' + JSON.stringify(errorData));
            }
        } catch (error) {
            alert('Error: ' + error.message);
        }
    };

    const openDeleteRecord = (record) => {
        setDeleteRecord(record);
    };

    const submitDeletedRecord = async (e) => {
        e.preventDefault();
        let { id } = deleteRecord;

        await fetch(`http://127.0.0.1:8000/api/medicalrecords/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        });
        setRecords(records.filter(record => record.id !== id));
        handleCloseModal();
    };

    const openAddRecordModal = () => {
        setNewRecord({ doctor_id: userId }); // Initialize the form with the logged-in user's ID
    };

    const submitNewRecord = async (e) => {
        e.preventDefault();
        const { patient_id, visit_date, diagnosis, treatment, notes } = newRecord;
    
        try {
            let result = await fetch('http://127.0.0.1:8000/api/medicalrecords', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({ patient_id, doctor_id: userId, visit_date, diagnosis, treatment, notes }),
            });
    
            if (result.ok) {
                result = await result.json();
                setRecords([...records, result.record]);
                handleCloseModal();
            } else {
                const errorData = await result.json();
                alert('Error adding record: ' + JSON.stringify(errorData));
            }
        } catch (error) {
            alert('Error: ' + error.message);
        }
    };

    return (
        <div className="crud">
        <Homepagedoctor />
        <main className="crud-body">
            <button className="btn btn-primary mb-3" onClick={openAddRecordModal}>Add Medical Record</button>
            <table className='table table-striped'>
                {/* Table Header */}
                <thead className='thead-dark'>
                    <tr>
                        <th>ID</th>
                        <th>Patient ID</th>
                        <th>Doctor ID</th>
                        <th>Visit Date</th>
                        <th>Diagnosis</th>
                        <th>Options</th>
                    </tr>
                </thead>
                {/* Table Body */}
                <tbody>
                    {records.map((record) => (
                        <tr key={record.id}>
                            <td>{record.id}</td>
                            <td>{record.patient_id}</td>
                            <td>{record.doctor_id}</td>
                            <td>{record.visit_date}</td>
                            <td>{record.diagnosis}</td>
                            <td>
                                <button className="btn btn-info mr-2" onClick={() => openViewRecord(record)} type="button">
                                    View
                                </button>
                                <button className="btn btn-primary mr-2" onClick={() => openEditRecord(record)} type="button">
                                    Edit
                                </button>
                                <button className="btn btn-secondary" onClick={() => openDeleteRecord(record)} type="button">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {selectedRecord && (
                <div className="modal show d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Medical Record Details</h5>
                                <button type="button" className="close" onClick={handleCloseModal} aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>Patient ID: {selectedRecord.patient_id}</p>
                                <p>Doctor ID: {selectedRecord.doctor_id}</p>
                                <p>Visit Date: {selectedRecord.visit_date}</p>
                                <p>Diagnosis: {selectedRecord.diagnosis}</p>
                                <p>Treatment: {selectedRecord.treatment}</p>
                                <p>Notes: {selectedRecord.notes}</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
                            </div>
                        </div>
                    </div>
                    </div>
            )}
            {editRecord && (
                <div className="modal show d-block" tabIndex="-1" role="dialog">
                    <form onSubmit={submitEditedRecord}>
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Edit Medical Record</h5>
                                    <button type="button" className="close" onClick={handleCloseModal} aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label>Patient ID:</label>
                                        <input type='text' className='form-control' name='patient_id' value={editRecord.patient_id} onChange={handleInputChange} disabled />
                                    </div>
                                    <div className="form-group">
                                        <label>Doctor ID:</label>
                                        <div className="form-group">
                                        <label>Doctor ID:</label>
                                        <input type='text' className='form-control' name='doctor_id' value={editRecord.doctor_id} onChange={handleInputChange} disabled />
                                    </div>
                                    <div className="form-group">
                                        <label>Visit Date:</label>
                                        <input type='date' className='form-control' name='visit_date' value={editRecord.visit_date} onChange={handleInputChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>Diagnosis:</label>
                                        <input type='text' className='form-control' name='diagnosis' value={editRecord.diagnosis} onChange={handleInputChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>Treatment:</label>
                                        <input type='text' className='form-control' name='treatment' value={editRecord.treatment} onChange={handleInputChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>Notes:</label>
                                        <textarea className='form-control' name='notes' value={editRecord.notes} onChange={handleInputChange}></textarea>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-success">Save</button>
                                    <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
                                </div>
                            </div>
                        </div>
                        </div>
                    </form>
                </div>
            )}
            {deleteRecord && (
                <div className="modal show d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Delete Medical Record</h5>
                                <button type="button" className="close" onClick={handleCloseModal} aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to delete this record?</p>
                                <p>Patient ID: {deleteRecord.patient_id}</p>
                                <p>Doctor ID: {deleteRecord.doctor_id}</p>
                                <p>Visit Date: {deleteRecord.visit_date}</p>
                                <p>Diagnosis: {deleteRecord.diagnosis}</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" onClick={submitDeletedRecord}>Delete</button>
                                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {newRecord && (
                <div className="modal show d-block" tabIndex="-1" role="dialog">
                    <form onSubmit={submitNewRecord}>
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Add Medical Record</h5>
                                    <button type="button" className="close" onClick={handleCloseModal} aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label>Patient Name:</label>
                                        <select className='form-control' onChange={handlePatientSelect} value={newRecord.patient_id || ''}>
                                            <option value=''>Select a patient</option>
                                            {users
                                                .filter(user => !user.role) // Filter users where role is empty
                                                .map(user => (
                                                    <option key={user.id} value={user.id}>
                                                        {user.name}
                                                    </option>
                                                ))}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Doctor ID:</label>
                                        <input type='text' className='form-control' name='doctor_id' value={userId} onChange={handleNewRecordInputChange} disabled />
                                    </div>
                                    <div className="form-group">
                                        <label>Visit Date:</label>
                                        <input type='date' className='form-control' name='visit_date' value={newRecord.visit_date || ''} onChange={handleNewRecordInputChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>Diagnosis:</label>
                                        <input type='text' className='form-control' name='diagnosis' value={newRecord.diagnosis || ''} onChange={handleNewRecordInputChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>Treatment:</label>
                                        <input type='text' className='form-control' name='treatment' value={newRecord.treatment || ''} onChange={handleNewRecordInputChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>Notes:</label>
                                        <textarea className='form-control' name='notes' value={newRecord.notes || ''} onChange={handleNewRecordInputChange}></textarea>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-success">Add</button>
                                    <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            )}
            </main>
        </div>
    );
}
