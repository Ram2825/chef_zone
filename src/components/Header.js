import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Importing AuthContext
import './Header.css';

const Header = () => {
    const { user, logout } = useContext(AuthContext); // Getting user and logout from AuthContext

    return (
        <header className="header">
            <div className="logo">
                <Link to="/">Chef Zone</Link>
            </div>
            <nav className="nav">
                <ul>
                    <li><Link to="/">Home</Link></li>

                    {user ? (
                        <>
                            <li><Link to="/chefs">Chefs</Link></li>
                            <li><Link to="/blogs">Blogs</Link></li>
                            <li><Link to="/reviews">Reviews</Link></li>
                            <li><Link to="/profile">Profile</Link></li>
                            <li><button onClick={logout} className="logout-button">Logout</button></li>
                        </>
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
