import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('user_id');
    const isLoggedIn = token && userId;

    return (
        <div className="homepage">
            <header className="hero-section">
                <h1>Welcome to Chef Zone</h1>
                <p>Find certified chefs for home-cooked meals.</p>
                {isLoggedIn ? (
                    <Link to="/chefs" className="cta-button">Find a Chef</Link>
                ) : (
                    <p className="login-prompt">Please <Link to="/login">log in</Link> to find chefs.</p>
                )}
            </header>
            <section className="how-it-works">
                <h2>How It Works</h2>
                <div className="cards-container">
                    <div className="card">
                        <h3>1. Search for Chefs</h3>
                        <p>Search for chefs based on your preferences and dietary requirements.</p>
                    </div>
                    <div className="card">
                        <h3>2. Read Reviews</h3>
                        <p>Read reviews and ratings to select your preferred chef.</p>
                    </div>
                    <div className="card">
                        <h3>3. Book a Chef</h3>
                        <p>Book a chef and enjoy a delicious home-cooked meal!</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
