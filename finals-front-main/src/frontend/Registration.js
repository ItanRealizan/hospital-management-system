import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Registration() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("user"); // Default role is user
    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('user-info')) {
            navigate('/login');
        }
    }, []);

    async function signup() {
        // Basic validation checks
        if (!email.endsWith('@gmail.com')) {
            setError("Please use a Gmail account for registration.");
            return;
        }

        if (password.length < 6) {
            setError("Password should be at least 6 characters long.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        // If all validations pass, proceed with registration
        let item = {
            name,
            email,
            password,
            confirm_password: confirmPassword,
            role // Use selected role
        };

        try {
            let result = await fetch("http://127.0.0.1:8000/api/register", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify(item)
            });

            result = await result.json();
            console.log(result);
            navigate('/login');
        } catch (error) {
            console.error('Registration error:', error);
        }
    }

    return (
        <div className="container veiw-h">
            <div className="account-input">
                <div className="col-md-4 m-auto bg-white rounded p-5">
                    <div className="mt-4">
                        <div className="form-group">
                            <label htmlFor="name" style={{ fontFamily: 'Arial, sans-serif', fontSize: '16px' }}>Full Name:</label>
                            <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" style={{ fontFamily: 'Arial, sans-serif' }} />
                        </div>
                        <div className="form-group mt-3">
                            <label htmlFor="email" style={{ fontFamily: 'Arial, sans-serif', fontSize: '16px' }}>Email:</label>
                            <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" style={{ fontFamily: 'Arial, sans-serif' }} />
                        </div>
                        <div className="form-group mt-3">
                            <label htmlFor="password" style={{ fontFamily: 'Arial, sans-serif', fontSize: '16px' }}>Password:</label>
                            <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" style={{ fontFamily: 'Arial, sans-serif' }} />
                        </div>
                        <div className="form-group mt-3">
                            <label htmlFor="confirm_password" style={{ fontFamily: 'Arial, sans-serif', fontSize: '16px' }}>Confirm Password:</label>
                            <input type="password" className="form-control" id="confirm_password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Retype password" style={{ fontFamily: 'Arial, sans-serif' }} />
                        </div>
                        <div className="form-group mt-3">
                            <label htmlFor="role" style={{ fontFamily: 'Arial, sans-serif', fontSize: '16px' }}>Role:</label>
                            <select className="form-control" id="role" value={role} onChange={(e) => setRole(e.target.value)} style={{ fontFamily: 'Arial, sans-serif' }}>
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                                <option value="receptionist">Receptionist</option>
                                <option value="doctor">Doctor</option>
                            </select>
                        </div>

                        {error && <div className="text-danger mt-3" style={{ fontFamily: 'Arial, sans-serif' }}>{error}</div>}

                        <div id="emailHelp" className="form-text mt-3" style={{ fontFamily: 'Arial, sans-serif' }}>Have an account? <Link className="text-decoration-none" to={"/login"} style={{ fontFamily: 'Arial, sans-serif' }}>Login</Link></div>
                        
                        <div className="d-grid mt-3">
                            <button type="button" onClick={signup} className="btn rounded-pill" style={{ backgroundColor: '#007bff', color: 'white', fontFamily: 'Arial, sans-serif', fontSize: '16px' }} name="register">Register</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
