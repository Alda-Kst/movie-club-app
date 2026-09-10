import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">🎬 MovieClub</Link>
      <div className="nav-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/watchlist" className="nav-link watchlist-btn">❤️ Watchlist</Link>
      </div>
    </nav>
  );
}

export default Navbar;