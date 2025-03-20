import React, { useState } from "react";
import Badge from "./Badge";
import "./../styles/landing.css";

const features = [
  { emoji: "🤣", title: "Silly Memories", desc: "Share your funniest school memories!" },
  { emoji: "🔮", title: "Future Predictions", desc: "Get a hilarious look at your future!" },
  { emoji: "🏆", title: "Earn Badges", desc: "Win cool badges for your reflections!" }
];

const Features = () => {
  const [showBadges, setShowBadges] = useState(false);

  const handleBadgeToggle = () => {
    setShowBadges((prev) => !prev);
  };

  return (
    <section className="features">
      <h2 className="features-title">Why Join The Final Bell?</h2>
      <div className="feature-cards">
        {features.map((feature, index) => (
          <div
            key={index}
            className="feature-card"
            onClick={() => feature.title === "Earn Badges" && handleBadgeToggle()}
          >
            <span className="feature-emoji">{feature.emoji}</span>
            <h3>{feature.title}</h3>
            <p>{feature.desc}</p>
          </div>
        ))}
      </div>

      {showBadges && <div className="badge-container fade-in"><Badge /></div>}
    </section>
  );
};

export default Features;
