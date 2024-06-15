import React from 'react';
import { Link } from 'react-router-dom';

const Homepage = () => {
    return (
                <nav className="crud-side">
                    <div className="position-sticky">
                        <div className="nav flex-column">
                            <Link className="nav-link" to="/manageuser">Manage User</Link>
                            <Link className="nav-link" to="/managedoctor">Manage Doctor</Link>
                        </div>
                    </div>
                </nav>
    );
}

export default Homepage;
