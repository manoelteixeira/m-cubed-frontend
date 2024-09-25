import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";
import logo from '/Users/eliwills/Desktop/Pursuit/MMM/m-cubed-frontend/src/Images/logo.jpeg'

export default function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={ logo } alt="MMM Logo" />
      </div>
      <ul className="navbar__links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/services">Services</Link>
        </li>
        <li>
          <Link to="/listings">Listings</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
      <div className="navbar__actions">
        <Link to="/login" className="navbar__login">
          Log In
        </Link>
        <Link to="/signup" className="navbar__signup">
          Sign Up
        </Link>
      </div>
    </nav>
  );
}
