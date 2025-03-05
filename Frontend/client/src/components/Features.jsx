import React from "react";
import "./../styles/landing.css";

const features = [
  { emoji: "😂", title: "Silly Memories", desc: "Share your funniest school memories!" },
  { emoji: "🔮", title: "Future Predictions", desc: "Get a hilarious look at your future!" },
  { emoji: "🏆", title: "Earn Badges", desc: "Win cool badges for your reflections!" },
];

const Features = () => {
  return (
    <section className="features">
      <h2>🎓 Why Join The Final Bell?</h2>
      <div className="feature-cards">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <span className="feature-emoji">{feature.emoji}</span>
            <h3>{feature.title}</h3>
            <p>{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
