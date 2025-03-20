import React, { useState, useEffect } from "react";
import image from "../assets/SchoolDays.png" ;
import "./../styles/landing.css";

const HeroSection = () => {
  const [text, setText] = useState("");
  const fullText = "Reflect, Laugh, Predict! 🎉";

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < fullText.length) {
        setText((prev) => prev + fullText[index]);
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);  
    return () => clearInterval(typingInterval);
  }, []);

  return (
    <section className="hero">
      <div className="hero-text">
        <h1 className="typing-effect">{text}</h1>
        <p>Your last school day, captured forever.</p>
        <button className="cta-button">Start Your Reflection</button>
      </div>
      <div className="hero-image">
        <img src={image} alt="Hero" className="floating-image" />
      </div>
    </section>
  );
};

export default HeroSection;
