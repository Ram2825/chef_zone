import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserBooking.css';

const UserBooking = () => {
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const userId = localStorage.getItem('user_id');
        if (!userId) {
            setError('User not logged in.');
            return;
        }

        axios.get(`http://localhost:8200/bookings/user/${userId}`)
            .then(response => {
                setBookings(response.data.results || []);
            })
            .catch(error => {
                console.error('Error fetching bookings:', error);
                setError('There was an error fetching your bookings.');
            });
    }, []);

    return (
        <div className="user-booking">
            <h1>Your Bookings</h1>
            {error && <p className="error-message">{error}</p>}
            {bookings.length > 0 ? (
                <ul className="booking-list">
                    {bookings.map(booking => (
                        <li key={booking.id} className="booking-item">
                            <p><strong>Chef:</strong> {booking.chef_name}</p>
                            <p><strong>Date:</strong> {booking.booking_date}</p>
                            <p><strong>Time:</strong> {booking.booking_time}</p>
                            <p><strong>Notes:</strong> {booking.additional_notes || 'N/A'}</p>
                            <p style={{color:"blue"}} ><strong >Status: {booking.status} </strong> </p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No bookings found.</p>
            )}
        </div>
    );
};

export default UserBooking;
