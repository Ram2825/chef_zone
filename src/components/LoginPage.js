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
                const { token } = response.data;
                const { user_id, role } = response.data.results[0];
                
                // Store login information
                login({ user_id, token, role }); 
                localStorage.setItem('token', token);
                localStorage.setItem('role', role);
                localStorage.setItem('user_id', user_id);

                // Navigate based on role
                if (role === 'chef') {
                    navigate('/dashboard'); // Redirect to dashboard if the user is a chef
                } else {
                    navigate('/'); // Redirect to home page if the user is not a chef
                }
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
