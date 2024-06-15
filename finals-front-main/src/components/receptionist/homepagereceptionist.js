import React from 'react';
import { Link } from 'react-router-dom';

const Homepagereceptionist = () => {
    return (
                <nav className="crud-side">
                    <div className="position-sticky">
                        <div className="nav flex-column">
                            <Link className="nav-link" to="/appointment">Appointments</Link>
                            <Link className="nav-link" to="/managepatient">Manage Patients</Link>
                        </div>
                    </div>
                </nav>
    );
}

export default Homepagereceptionist;
