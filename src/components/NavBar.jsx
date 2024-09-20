import React from 'react'
import { Link } from 'react-router-dom';

export default function NavBar() {
    return (
        <nav className="navbar">
          <div className="navbar-logo">
            <img src="" alt="MMM Logo" />
          </div>
          <ul className="navbar-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/listings">Listings</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/employees">For Employers</Link></li>
          </ul>
          <div className="navbar-actions">
            <a href="/login" className="navbar-login">Log In</a>
            <a href="/signup" className="navbar-signup">Sign Up</a>
          </div>
        </nav>
      );
}
