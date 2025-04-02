import React from "react";
import { Routes, Route } from "react-router-dom"; 
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import Features from "./components/Features";
import Footer from "./components/Footer";
import PostList from "./components/PostList"; 
import Badge from "./components/Badge";
import AddEntity from "./components/AddEntity"; 
import UpdateEntity from "./components/UpdateEntity"; // Import the UpdateEntity page
import { Link } from "react-router-dom";

import "./styles/global.css";

function App() {
  return (
    <> 
   
      <Header />
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
                      backgroundColor: "#22c55e", 
                      color: "white",
                      padding: "10px 20px",
                      fontSize: "16px",
                      border: "none",
                      borderRadius: "8px",
                      cursor: "pointer",
                      transition: "background 0.3s ease"  
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = "#16a34a"}
                    onMouseOut={(e) => e.target.style.backgroundColor = "#22c55e"}
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
        <Route path="/update/:id" element={<UpdateEntity />} />  {/* New Route */}
      </Routes>
      <Footer />
    </>
  );
}

export default App;
