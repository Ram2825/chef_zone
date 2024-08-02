import React from 'react';
import './UserProfile.css';

const UserProfile = () => {
    const user = {
        name: 'John Doe',
        email: 'john@example.com',
        preferences: 'Spicy food, Vegetarian'
    };

    return (
        <div className="user-profile">
            <h1>User Profile</h1>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Preferences:</strong> {user.preferences}</p>
        </div>
    );
};

export default UserProfile;
