import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";

export default function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="" alt="MMM Logo" />
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
        <li>
          <Link to="/employees">For Employers</Link>
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
