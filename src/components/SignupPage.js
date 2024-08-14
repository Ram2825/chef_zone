import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';

const SignupPage = () => {
    const [userName, setUserName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = JSON.stringify({
            userName,
            firstName,
            lastName,
            email,
            password,
            address,
            mobileNo
        });

        const config = {
            method: 'post',
            url: 'http://localhost:8200/chef_zone/autenticate/signup',
            headers: { 
                'Content-Type': 'application/json'
            },
            data: data
        };

        try {
            const response = await axios.request(config);
            if (response.data.status === 200) {
                console.log(response.data);
                navigate('/login'); // Redirect to login page or another page
            } else {
                setError('Signup failed. Please check your details and try again.');
            }
        } catch (error) {
            console.error('There was an error!', error);
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="auth-container">
            <header className="hero-section">
                <h1>Register for an Account</h1>
            </header>
            <div className="auth-form">
                <form onSubmit={handleSubmit}>
                    <div className="auth-field-group">
                        <div className="auth-field">
                            <label>Username:</label>
                            <input
                                type="text"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="auth-field">
                            <label>First Name:</label>
                            <input
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="auth-field-group">
                        <div className="auth-field">
                            <label>Last Name:</label>
                            <input
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="auth-field">
                            <label>Email:</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="auth-field-group">
                        <div className="auth-field">
                            <label>Password:</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="auth-field">
                            <label>Address:</label>
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="auth-field-group">
                        <div className="auth-field">
                            <label>Mobile No:</label>
                            <input
                                type="text"
                                value={mobileNo}
                                onChange={(e) => setMobileNo(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit">Sign Up</button>
                    <p>Already have an account? <Link to="/login">Login here</Link></p>
                </form>
            </div>
        </div>
    );
};

export default SignupPage;
