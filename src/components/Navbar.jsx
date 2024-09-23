import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 

const Navbar = () => {
  return (
    <div className="nav-bar">
      <button className="logo"><img src='src/Images/logo.jpeg'/></button>
      
      <nav className="navbar">
          <ul className="navbar-list">
            <li><Link to="/AboutUs">About</Link></li>
            <li><Link to="/Home">Home</Link></li>
            
          </ul>
        
      </nav>
      
      <div className="navbar-auth">
        <a href="#" className="auth-link">Login/Register</a>
      </div>
     
    </div>
  );
}

export default Navbar;