import React, { useState, useEffect } from 'react';
import Homepageuser from './homepageuser';

export default function MedicalRecordsManagement() {
    const [records, setRecords] = useState([]);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const userId = Number(localStorage.getItem('user-id'));

    useEffect(() => {
        const fetchRecords = async () => {
            let result = await fetch('http://127.0.0.1:8000/api/medicalrecords');
            result = await result.json();
            
            // Filter records where userId matches patient_id
            const userRecords = result.filter(record => record.patient_id === userId);
            setRecords(userRecords);
        };
        fetchRecords();
    }, [userId]);

    const openViewRecord = (record) => {
        setSelectedRecord(record);
    };

    const handleCloseModal = () => {
        setSelectedRecord(null);
    };

    return (
        <div className="crud">
        <Homepageuser />
        <main className="crud-body">
                    <div className="container mt-5">
                        <h2>Medical Records</h2>
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
                                            <button className="btn btn-success mr-2" onClick={() => openViewRecord(record)} type="button">
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Modal for viewing record details */}
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
                                        <p><strong>Patient ID:</strong> {selectedRecord.patient_id}</p>
                                        <p><strong>Doctor ID:</strong> {selectedRecord.doctor_id}</p>
                                        <p><strong>Visit Date:</strong> {selectedRecord.visit_date}</p>
                                        <p><strong>Diagnosis:</strong> {selectedRecord.diagnosis}</p>
                                        <p><strong>Treatment:</strong> {selectedRecord.treatment}</p>
                                        <p><strong>Notes:</strong> {selectedRecord.notes}</p>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>
    );
}
