import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Auth.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:8200/chef_zone/autenticate/login', {
                userEmail: email,
                Password: password
            }, {
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.data.status === 200) {
                const { user_id, token, role } = response.data.results[0]; // Capture the role from the response
                login({ user_id, token, role }); // Pass role to the login function
                localStorage.setItem('token', token);
                localStorage.setItem('role', role); // Store role in localStorage or wherever necessary
                navigate('/');
            } else {
                setError('Login failed. Please check your credentials and try again.');
            }
        } catch (error) {
            console.error('Login failed:', error);
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="auth-container">
            <header className="hero-section">
                <h1>Login</h1>
            </header>
            <form onSubmit={handleSubmit} className="auth-form">
                <div className="auth-field">
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="auth-field">
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="error-message">{error}</p>}
                <button type="submit">Login</button>
                <p>Don't have an account? <Link to="/signup">Sign up here</Link></p>
            </form>
        </div>
    );
};

export default LoginPage;
