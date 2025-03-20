import React from "react";
import "./../styles/landing.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="navbar">
      <h1 className="logo">🎓 The Final Bell</h1>
      <nav>
        <ul className="nav-links">
          <li><Link to="/">🏠 Home</Link></li>
          <li><Link to="/features">✨ Features</Link></li>
          <li><Link to="/about">📖 About</Link></li>
          <li><Link to="/contact">📩 Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
