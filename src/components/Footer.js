import React from 'react';
import './Footer.css';
const Footer = () => {
    return (
        <footer className="footer">
            <p className='footer-paragraph'>&copy; {new Date().getFullYear()} Chef Zone. All rights reserved.</p>
            <nav className="footer-nav">
                <ul>
                    <li><a href="/terms">Terms of Service</a></li>
                    <li><a href="/privacy">Privacy Policy</a></li>
                    <li><a href="/contact">Contact Us</a></li>
                </ul>
            </nav>
        </footer>
    );
};

export default Footer;
