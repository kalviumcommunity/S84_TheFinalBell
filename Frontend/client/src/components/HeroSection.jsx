import React, { useState, useEffect } from "react";
import "./../styles/landing.css";
import Globe from "globe.gl";
import AuthModal from './AuthModal';

const HeroSection = () => {
  const fullText = "Reflect, Laugh and PREDICT...";
  const [text, setText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true); // toggle between login and signup

  useEffect(() => {
    let index = 0;
    setText("");

    const typingInterval = setInterval(() => {
      if (index < fullText.length) {
        setText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, []);

  const handleLoginSuccess = () => {
    setIsModalOpen(false);
  };

  const handleSwitchMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <section className="hero">
      <div className="hero-text">
        <h1 className="typing-effect">{text}</h1>
        <p>Your last school day, captured forever.</p>
        <button 
          className="cta-button"
          onClick={() => {
            setIsLogin(true);        // default to Login first or set to false for SignUp
            setIsModalOpen(true);
          }}
        >
          Start Your Reflection
        </button>
      </div>

      <div className="hero-image">
        {/* <img src={image} alt="Hero" className="floating-image" /> */}
      </div>

      {isModalOpen && (
        <AuthModal 
          isLogin={isLogin}
          onClose={() => setIsModalOpen(false)}
          switchMode={handleSwitchMode}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </section>
  );
};

export default HeroSection;
