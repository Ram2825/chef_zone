import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ChefBooking.css';

const ChefBooking = () => {
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const chefId = localStorage.getItem('chef_id');
        if (!chefId) {
            setError('Chef not logged in.');
            return;
        }

        axios.get(`http://localhost:8200/bookings/chef/${chefId}`)
            .then(response => {
                setBookings(response.data.results || []);
            })
            .catch(error => {
                console.error('Error fetching bookings:', error);
                setError('There was an error fetching the bookings.');
            });
    }, []);

    return (
        <div className="chef-booking">
            <h1>Chef Bookings</h1>
            {error && <p className="error-message">{error}</p>}
            {bookings.length > 0 ? (
                <ul className="booking-list">
                    {bookings.map(booking => (
                        <li key={booking.id} className="booking-item">
                            <p><strong>User:</strong> {booking.user_name}</p>
                            <p><strong>Date:</strong> {booking.booking_date}</p>
                            <p><strong>Time:</strong> {booking.booking_time}</p>
                            <p><strong>Notes:</strong> {booking.additional_notes || 'N/A'}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No bookings found.</p>
            )}
        </div>
    );
};

export default ChefBooking;
