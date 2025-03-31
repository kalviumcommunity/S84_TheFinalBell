import React, { useEffect, useState } from "react";
import axios from "axios";

const Badge = () => {
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleBadges, setVisibleBadges] = useState({});

  const fetchBadges = async () => {
    try {
      const response = await axios.get("http://localhost:2524/api/badge");
      setBadges(response.data.Badges );
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch Badges!");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBadges();
  }, []);

  const toggleBadge = (id) => {
    setVisibleBadges((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="badge-container">
      <h1 className="title">🏅 Welcome to the Badge Ceremony! 🎉</h1>
      <p className="subtitle">Click on a badge to reveal its description.</p>

      {loading && <div className="spinner"></div>}

      {error && <p className="error">{error}</p>}

      <div className="badge-grid">
        {Array.isArray(badges) &&
          badges.map((badge, index) => (
            <div
              key={index}
              className="badge-card"
              onClick={() => toggleBadge(index)}
            >
              <h2 className="badge-name">{badge.name}</h2>
              {visibleBadges[index] && (
                <p className="badge-description">{badge.description}</p>
              )}
            </div>
          ))}
      </div>


      <style>{`
        .badge-container {
          text-align: center;
          background: linear-gradient(to right, #4b6cb7, #182848);
          color: white;
          padding: 40px;
          border-radius: 10px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        }

        .title {
          font-size: 2rem;
          margin-bottom: 10px;
        }

        .subtitle {
          font-size: 1.2rem;
          opacity: 0.8;
          margin-bottom: 20px;
        }

        .badge-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 20px;
        }

        .badge-card {
          background: white;
          color: black;
          padding: 15px;
          border-radius: 10px;
          width: 250px;
          text-align: center;
          cursor: pointer;
          box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .badge-card:hover {
          transform: scale(1.05);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
        }

        .badge-name {
          font-size: 1.5rem;
          font-weight: bold;
        }

        .badge-description {
          font-size: 1rem;
          margin-top: 8px;
          opacity: 0.8;
        }

        .spinner {
          width: 40px;
          height: 40px;
          border: 4px solid white;
          border-top: 4px solid transparent;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 20px auto;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .error {
          color: #ff4d4d;
          font-size: 1.2rem;
          margin-top: 10px;
        }
      `}</style>
    </div>
  );
};

export default Badge;
