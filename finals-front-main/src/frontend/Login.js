import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login({ userUpdate }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    async function signin(event) {
        event.preventDefault(); // Prevent default form submission behavior

        let item = { email, password };

        let result = await fetch("http://127.0.0.1:8000/api/user_login", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(item)
        });

        result = await result.json();

        if (result.error) {
            setError("Wrong email or password. Please try again.");
        } else {
            localStorage.setItem('user-info', JSON.stringify(result));
            localStorage.setItem('user-email', result.email);
            localStorage.setItem('user-id', result.id);
            localStorage.setItem('user-role', result.role);

            userUpdate();

            if (result.role === 'admin') {
                navigate('/admin');
            } else if (result.role === 'doctor') {
                navigate('/doctorpage');
            } else if (result.role === 'receptionist') {
                navigate('/receptionist');
            } else {
                navigate('/user');
            }
        }
    }

    return (
        <div className="container veiw-h">
            <div className="account-input">
                <div className="col-md-4 m-auto bg-white rounded p-5">
                    <form onSubmit={signin} className="mt-4">
                        <div className="form-group mt-3">
                            <label htmlFor="email" style={{ fontFamily: 'Arial, sans-serif', fontSize: '16px' }}>Email:</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                style={{ fontFamily: 'Arial, sans-serif' }}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label htmlFor="password" style={{ fontFamily: 'Arial, sans-serif', fontSize: '16px' }}>Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                style={{ fontFamily: 'Arial, sans-serif' }}
                            />
                        </div>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <div id="emailHelp" className="form-text" style={{ fontFamily: 'Arial, sans-serif' }}>
                            Don't have an account? <Link className="text-decoration-none" to={"/register"}>Create</Link>
                        </div>
                        <div className="d-grid mt-3">
                            <button type="submit" className="btn rounded-pill" style={{ backgroundColor: '#007bff', color: 'white', fontFamily: 'Verdana, Geneva, sans-serif', fontSize: '16px' }}>LOGIN</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
