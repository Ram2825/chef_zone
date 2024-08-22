import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ChefProfile.css';

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [updatedUserData, setUpdatedUserData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        mobile_no: '',
        address: '',
        bio: '',
        specialty: '',
        experience_years: ''
    });

    useEffect(() => {
        const fetchUserData = async () => {
            const userId = localStorage.getItem('user_id');
            
            if (!userId) {
                setError('User ID not found in local storage.');
                return;
            }

            try {
                const response = await axios.get(`http://localhost:8200/chef_zone/autenticate/user/${userId}`);
                
                if (response.status === 200) {
                    setUser(response.data.user);
                    setUpdatedUserData({
                        first_name: response.data.user.first_name,
                        last_name: response.data.user.last_name,
                        email: response.data.user.email,
                        mobile_no: response.data.user.mobile_no,
                        address: response.data.user.address,
                        bio: response.data.user.bio || '',
                        specialty: response.data.user.specialty || '',
                        experience_years: response.data.user.experience_years || ''
                    });
                } else {
                    setError('Failed to fetch user data.');
                }
            } catch (err) {
                setError('An error occurred while fetching user data.');
                console.error(err);
            }
        };

        fetchUserData();
    }, []);

    const handleModalToggle = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedUserData({
            ...updatedUserData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userId = localStorage.getItem('user_id');
        
        try {
            const response = await axios.put(`http://localhost:8200/chef_zone/autenticate/user/${userId}`, updatedUserData);

            if (response.status === 200) {
                setUser({
                    ...user,
                    ...updatedUserData
                });
                handleModalToggle();
            } else {
                setError('Failed to update user data.');
            }
        } catch (err) {
            setError('An error occurred while updating user data.');
            console.error(err);
        }
    };

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="user-profile-container">
            {/* Hero Section */}
            <header className="hero-section">
                <h1>Profile Details</h1>
            </header>

            {/* Profile Details Section */}
            <div className="profile-details">
                <p><strong>Name:</strong> {user.first_name} {user.last_name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Mobile No:</strong> {user.mobile_no}</p>
                <p><strong>Address:</strong> {user.address}</p>
                {/* <p><strong>Bio:</strong> {user.bio || 'N/A'}</p>
                <p><strong>Specialty:</strong> {user.specialty || 'N/A'}</p>
                <p><strong>Experience Years:</strong> {user.experience_years || 'N/A'}</p> */}
                <button onClick={handleModalToggle} className="edit-profile-button">Edit Profile</button>
            </div>

            {/* Modal for Editing Profile */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Edit Profile</h2>
                        <form onSubmit={handleSubmit}>
                            <label>
                                First Name:
                                <input
                                    type="text"
                                    name="first_name"
                                    value={updatedUserData.first_name}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <label>
                                Last Name:
                                <input
                                    type="text"
                                    name="last_name"
                                    value={updatedUserData.last_name}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <label>
                                Email:
                                <input
                                    type="email"
                                    name="email"
                                    value={updatedUserData.email}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <label>
                                Mobile No:
                                <input
                                    type="text"
                                    name="mobile_no"
                                    value={updatedUserData.mobile_no}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <label>
                                Address:
                                <input
                                    type="text"
                                    name="address"
                                    value={updatedUserData.address}
                                    onChange={handleInputChange}
                                />
                            </label>
                            
                            <button type="submit">Save Changes</button>
                            <button type="button" onClick={handleModalToggle}>Cancel</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserProfile;
