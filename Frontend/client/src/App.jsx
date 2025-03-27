import React from "react";
import { Routes, Route } from "react-router-dom"; 
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import Features from "./components/Features";
import Footer from "./components/Footer";
import PostList from "./components/PostList"; 
import Badge from "./components/Badge";
import AddEntity from "./components/AddEntity"; 
import { Link } from "react-router-dom";

import "./styles/global.css";

function App() {
  return (
    <>
      <Header />
      
      {/* Add Entity Button - Styled and Positioned */}
     

      <Routes>
        <Route
          path="/"
          element={
            <>
              <HeroSection />
              <div style={{ textAlign: "center", margin: "20px 0" }}>
        <Link to="/add-entity">
          <button 
            style={{
              backgroundColor: "#22c55e", // Green color
              color: "white",
              padding: "10px 20px",
              fontSize: "16px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "background 0.3s ease"
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = "#16a34a"} // Darker green on hover
            onMouseOut={(e) => e.target.style.backgroundColor = "#22c55e"} // Reset on mouse out
          >
            ➕ Add Entity
          </button>
        </Link>
      </div>
              <Features />
              <h2 style={{ textAlign: "center", marginTop: "20px" }}>Recent Reflections ...</h2>
              <PostList />
            </>
          }
        />
        <Route path="/add-entity" element={<AddEntity />} />  
      </Routes>
      
      <Footer />
    </>
  );
}

export default App;
