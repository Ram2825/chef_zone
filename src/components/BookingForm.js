import React, { useState } from 'react';
import './BookingForm.css';

const BookingForm = () => {
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [preferences, setPreferences] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission, e.g., send data to backend
        console.log({ name, date, time, preferences });
    };

    return (
        <form onSubmit={handleSubmit} className="booking-form">
            <div>
                <label>Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
                <label>Date:</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            </div>
            <div>
                <label>Time:</label>
                <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
            </div>
            <div>
                <label>Preferences:</label>
                <textarea value={preferences} onChange={(e) => setPreferences(e.target.value)} required />
            </div>
            <button type="submit">Book Chef</button>
        </form>
    );
};

export default BookingForm;
