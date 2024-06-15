import React from 'react';
import { Link } from 'react-router-dom';

const Homepageuser = () => {
    return (
                <nav className="crud-side">
                    <div className="position-sticky">
                        <div className="nav flex-column">
                            <Link className="nav-link" to="/userpage">Appoint Doctor</Link>
                            <Link className="nav-link" to="/mymedicalrecord">My Medical Record</Link>
                        </div>
                    </div>
                </nav>
    );
}

export default Homepageuser;
