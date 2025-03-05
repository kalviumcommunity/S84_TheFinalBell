import React from "react";
import heroImage from "../assets/hero-image.png"; // Add an image
import "./../styles/landing.css";

const HeroSection = () => {
  return (
    <section className="hero">
      <div className="hero-text">
        <h1>Reflect, Laugh, Predict! 🎉</h1>
        <p>Your last school day, captured forever.</p>
        <button className="cta-button">Start Your Reflection</button>
      </div>
      <div className="hero-image">
        <img src={heroImage} alt="Hero" />
      </div>
    </section>
  );
};

export default HeroSection;
