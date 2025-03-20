import React from "react";
import {FaLinkedin } from "react-icons/fa";
import { FaGithub, FaEnvelope } from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";
import "./../styles/landing.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h2 className="footer-title">The Final Bell 🎓</h2>
        <p className="footer-text">
          {/* Reflect. Laugh. Predict. Your last school day, captured forever. */}
        </p>
        <div className="social-icons">
        <a href="https://github.com/ANU-2524?tab=repositories" className="social-icon" target="_blank" rel="noopener noreferrer">
  <FaGithub />
</a>
<a href="https://leetcode.com/u/Anu2524/" className="social-icon" target="_blank" rel="noopener noreferrer">
  <SiLeetcode />
</a>
<a href="mailto:anusoni25.2006@gmail.com" className="social-icon">
  <FaEnvelope />
</a>
          <a href="https://www.linkedin.com/in/anu--soni/" className="social-icon" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
        </div>
        <p className="footer-bottom-text">© 2025 The Final Bell. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
