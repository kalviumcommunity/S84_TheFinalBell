import React from "react";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import Features from "./components/Features";
import Footer from "./components/Footer";
import PostList from "./components/PostList"; // Import PostList component
import "./styles/global.css";
import { Routes } from "react-router-dom";
import Badge from "./components/Badge" ;
function App() {
  return (
    <div>
   
      <Header />
      <HeroSection />
      <Features />
      <h2>Recent Reflections ...</h2>
      <PostList />  {/* Render multiple post cards */}
      <Footer />
      {/* <Badge/> */}
    </div>
  );
}

export default App;
