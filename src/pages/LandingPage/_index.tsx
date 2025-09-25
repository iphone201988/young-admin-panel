import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Features from "./components/Features";
import UserTypes from "./components/UserTypes";
import Premium from "./components/Premium";
import Security from "./components/Security";
import Footer from "./components/Footer";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Features />
      <UserTypes />
      {/* <Premium /> */}
      <Security />
      <Footer />
    </div>
  );
};

export default LandingPage;
