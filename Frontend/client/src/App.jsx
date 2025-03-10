import React from "react";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import Features from "./components/Features";
import Footer from "./components/Footer";
import "./styles/global.css";

function App() {
  return (
    <div>
      <Header />
      <HeroSection />
      <Features />
      <Footer />
    </div>
  );
}

export default App;
