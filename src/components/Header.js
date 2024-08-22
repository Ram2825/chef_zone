import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('user_id');
    const userRole = localStorage.getItem('user_role'); // Assuming role is also stored in localStorage

    const isLoggedIn = token && userId;
    const isChef = userRole === 'chef';

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <header className="header">
            <div className="logo">
                <Link to="/">Chef Zone</Link>
            </div>
            <nav className="nav">
                <ul>
                    {isLoggedIn && !isChef && (
                        <li><Link to="/">Home</Link></li>
                    )}

                    {isLoggedIn ? (
                        isChef ? (
                            <>
                                <li><Link to="/dashboard">Dashboard</Link></li>
                                <li><Link to="/create-recipe">Create Recipe</Link></li>
                                <li><Link to="/manage-bookings">Manage Bookings</Link></li>
                                <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
                            </>
                        ) : (
                            <>
                                <li><Link to="/chefs">Chefs</Link></li>
                                <li><Link to="/blogs">Blogs</Link></li>
                                <li><Link to="/bookings">Bookings</Link></li>
                                <li><Link to="/reviews">Reviews</Link></li>
                                <li><Link to="/profile">Profile</Link></li>
                                <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
                            </>
                        )
                    ) : (
                        <>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/signup">Register</Link></li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
