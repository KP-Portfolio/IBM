import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h2>GiftLink</h2>

      <div className="nav-links">
        {/* Task 1: Add links to Home and Gifts */}
        <Link to="/">Home</Link>
        <Link to="/main">Gifts</Link>
        <li className="nav-item">
            <Link className="nav-link" to="/app/search">Search</Link>
        </li>
      </div>
    </nav>
  );
}

export default Navbar;