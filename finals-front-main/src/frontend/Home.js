import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className="home-container">
            <div className='home-options'>
                <h1 style={{ fontFamily: 'Arial, sans-serif', fontSize: '3rem', marginBottom: '30px' }}>Welcome to Hospital Management System</h1>
                <div>
                    <Link to="/login">
                        <button className="btn btn-primary btn-lg me-2">Log In</button>
                    </Link>
                    <Link to="/register">
                        <button className="btn btn-primary btn-lg">Sign Up</button>
                    </Link>
                </div>
            </div>
            {/* Additional content goes here */}
        </div>
    );
}
