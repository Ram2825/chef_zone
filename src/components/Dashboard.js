import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css'; // Ensure you have CSS for styling

const Dashboard = () => {
    const [bookings, setBookings] = useState([]);
    const [statusCounts, setStatusCounts] = useState({ pending: 0, approved: 0, declined: 0 });
    const [error, setError] = useState(null);
    const [chefId, setChefId] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Retrieve the chef_id from localStorage
        const storedChefId = localStorage.getItem('user_id');
        
        if (storedChefId) {
            setChefId(storedChefId);
        } else {
            setError('No chef ID found in localStorage.');
        }
    }, []);

    useEffect(() => {
        if (chefId) {
            const fetchBookings = async () => {
                setLoading(true);
                try {
                    const response = await axios.get(`http://localhost:8200/bookings/chef/${chefId}`);
                    if (response.data.status === 200) {
                        setBookings(response.data.results);
                        const counts = response.data.results.reduce((acc, booking) => {
                            acc[booking.status.toLowerCase()] = (acc[booking.status.toLowerCase()] || 0) + 1;
                            return acc;
                        }, { pending: 0, approved: 0, declined: 0 });
                        setStatusCounts(counts);
                    } else {
                        setError('Failed to fetch bookings.');
                    }
                } catch (error) {
                    console.error('Error fetching bookings:', error);
                    setError('An error occurred while fetching bookings.');
                } finally {
                    setLoading(false);
                }
            };

            fetchBookings();
        }
    }, [chefId]);

    const handleStatusChange = async (bookingId, newStatus) => {
        try {
            const response = await axios.post(`http://localhost:8200/bookings/${bookingId}/status`, { status: newStatus });
            if (response.data.status === 200) {
                setBookings((prevBookings) =>
                    prevBookings.map((booking) =>
                        booking.booking_id === bookingId
                            ? { ...booking, status: newStatus }
                            : booking
                    )
                );
                setStatusCounts((prevCounts) => {
                    const updatedCounts = { ...prevCounts };
                    updatedCounts[bookings.status.toLowerCase()] -= 1;
                    updatedCounts[newStatus.toLowerCase()] += 1;
                    return updatedCounts;
                });
            } else {
                setError('Failed to update booking status.');
            }
        } catch (error) {
            console.error('Error updating booking status:', error);
            setError('An error occurred while updating booking status.');
        }
    };

    return (
        <div className="dashboard-container">
            <h1>Dashboard</h1>
            {loading && <p>Loading...</p>}
            {error && <p className="error-message">{error}</p>}
            <div className="status-cards">
                <div className="card card-pending">
                    <h3>Pending Bookings</h3>
                    <p>{statusCounts.pending}</p>
                </div>
                <div className="card card-approved">
                    <h3>Approved Bookings</h3>
                    <p>{statusCounts.approved}</p>
                </div>
                <div className="card card-declined">
                    <h3>Declined Bookings</h3>
                    <p>{statusCounts.declined}</p>
                </div>
            </div>
            {bookings.length > 0 ? (
                <table className="bookings-table">
                    <thead>
                        <tr>
                            <th>Booking ID</th>
                            <th>User Name</th>
                            <th>User Email</th>
                            <th>User Mobile</th>
                            <th>Booking Date</th>
                            <th>Booking Time</th>
                            <th>Additional Notes</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking) => (
                            <tr key={booking.booking_id}>
                                <td>{booking.booking_id}</td>
                                <td>{booking.user_name}</td>
                                <td>{booking.user_email}</td>
                                <td>{booking.user_mobile}</td>
                                <td>{new Date(booking.booking_date).toLocaleDateString()}</td>
                                <td>{booking.booking_time}</td>
                                <td>{booking.additional_notes || 'N/A'}</td>
                                <td>{booking.status || 'Pending'}</td>
                                <td>
                                    <select
                                        value={booking.status || 'Pending'}
                                        onChange={(event) => handleStatusChange(booking.booking_id, event.target.value)}
                                        className="status-dropdown"
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Approved">Approved</option>
                                        <option value="Declined">Declined</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No bookings available.</p>
            )}
        </div>
    );
};

export default Dashboard;
