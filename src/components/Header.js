import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Header.css';

const Header = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <header className="header">
            <div className="logo">
                <Link to="/">Chef Zone</Link>
            </div>
            <nav className="nav">
                <ul>
                    {/* Conditionally render the "Home" link */}
                    {user && user.role !== 'chef' && (
                        <li><Link to="/">Home</Link></li>
                    )}

                    {user ? (
                        user.role === 'chef' ? (
                            <>
                                <li><Link to="/dashboard">Dashboard</Link></li>
                                <li><Link to="/create-recipe">Create Recipe</Link></li>
                                <li><Link to="/manage-bookings">Manage Bookings</Link></li>
                                <li><button onClick={logout} className="logout-button">Logout</button></li>
                            </>
                        ) : (
                            <>
                                <li><Link to="/chefs">Chefs</Link></li>
                                <li><Link to="/blogs">Blogs</Link></li>
                                <li><Link to="/reviews">Reviews</Link></li>
                                <li><Link to="/profile">Profile</Link></li>
                                <li><button onClick={logout} className="logout-button">Logout</button></li>
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
