import React, { useState, useEffect } from "react";
// import image from "../assets/vintage.png";
// import image from "../assets/vintage2.jpeg"
import "./../styles/landing.css";
// import React, { useRef, useEffect } from "react";
import Globe from "globe.gl";


const HeroSection = () => {
  const fullText = "Reflect, Laugh and PREDICT...";
  const [text, setText] = useState("");

  useEffect(() => {
    let index = 0;
    setText(""); // Ensure the text is reset before starting

    const typingInterval = setInterval(() => {
      if (index < fullText.length) {
        setText(() => fullText.slice(0, index + 1)); // Use slice instead of concatenation
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, []); // Runs only once on mount

  return (
    <section className="hero">
      <div className="hero-text">
        <h1 className="typing-effect">{text}</h1>
        <p>Your last school day, captured forever.</p>
        <button className="cta-button">Start Your Reflection</button>
      </div>
      <div className="hero-image">
        {/* <img src={image} alt="Hero" className="floating-image" /> */}
      </div>
    </section>
  );
};

export default HeroSection;
