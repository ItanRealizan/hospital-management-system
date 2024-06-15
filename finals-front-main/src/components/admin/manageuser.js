import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Homepage from './homepage'; // Assuming Homepage component is in the same directory

export default function UserManagement() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [editUser, setEditUser] = useState(null);
    const [deleteUser, setDeleteUser] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                let result = await fetch('http://127.0.0.1:8000/api/users');
                result = await result.json();
                setUsers(result);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
    }, []);

    const openViewUser = (user) => {
        setSelectedUser(user);
    };

    const handleCloseModal = () => {
        setSelectedUser(null);
        setEditUser(null);
        setDeleteUser(null);
    };

    const openEditUser = (user) => {
        setEditUser(user);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditUser((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const submitEditedUser = async (e) => {
        e.preventDefault();
        const { id, name, email, role, password } = editUser;

        try {
            let result = await fetch(`http://127.0.0.1:8000/api/users/${id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify({ name, email, role, password })
            });

            if (result.ok) {
                result = await result.json();
                setUsers(users.map(user => (user.id === id ? result : user)));
                handleCloseModal();
            } else {
                const errorData = await result.json();
                alert('Error updating user: ' + JSON.stringify(errorData));
            }
        } catch (error) {
            alert('Error: ' + error.message);
        }
    };

    const openDeleteUser = (user) => {
        setDeleteUser(user);
    };

    const submitDeletedUser = async (e) => {
        e.preventDefault();
        let { id } = deleteUser;

        try {
            await fetch(`http://127.0.0.1:8000/api/users/${id}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
            });
            setUsers(users.filter(user => user.id !== id));
            handleCloseModal();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div className="crud">
            <Homepage />
            <main className="crud-body">
                <div className="table-container">
                    <table className='table table-striped text-font'>
                        <thead className='thead-dark'>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>
                                        <button className="btn btn-info spaced-btn" onClick={() => openViewUser(user)} type="button">
                                            View
                                        </button>
                                        <button className="btn btn-primary spaced-btn" onClick={() => openEditUser(user)} type="button">
                                            Edit
                                        </button>
                                        <button className="btn btn-secondary" onClick={() => openDeleteUser(user)} type="button">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
            {/* Modals omitted for brevity */}
        </div>
    );
}
