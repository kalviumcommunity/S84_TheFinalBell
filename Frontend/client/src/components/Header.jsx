import React from "react";
import "./../styles/landing.css";

const Header = () => {
  return (
    <header className="navbar">
      <h1 className="logo">🎓 The Final Bell</h1>
      <nav>
        <ul className="nav-links">
          <li><a href="#">Home</a></li>
          <li><a href="#">Features</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
