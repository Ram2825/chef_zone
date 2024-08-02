import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
        <header className="header">
            <div className="logo">
                <Link to="/">Chef Zone</Link>
            </div>
            <nav className="nav">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/chefs">Chefs</Link></li>
                    <li><Link to="/blogs">Blogs</Link></li>
                    <li><Link to="/reviews">Reviews</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                    <li><Link to="/book">Book a Chef</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
