import { useEffect, useState } from "react";
import "./App.css";

import Navbar from "./components/NavBar/NavBar";
import About from "./pages/home/sections/About";
import Tracks from "./pages/home/sections/Tracks";
import Schedule from "./pages/home/sections/Schedule";
import FAQ from "./pages/home/sections/FAQ";
import Sponsors from "./pages/home/sections/Sponsors";
import Home from "./pages/home/sections/Home";
import MLHBadge from "./components/MLHBadge";
import ScrollBarTrack from "./components/ScrollBar/ScrollBarTrack";
import Footer from "./pages/home/sections/Footer";
import ScrollBar from "./components/ScrollBar/ScrollBar";
import {Routes, Route } from "react-router-dom";
import Login from "./pages/authorization/Login"; 
import Signup from "./pages/authorization/Signup";
import Sidebar from "./components/SideBar/SideBar";
import Dashboard from "./pages/registration/dashboard";
import Profile from "./pages/registration/profile";
import Register from "./pages/registration/register";
import Team from "./pages/registration/team";


function App() {
  const [landing2Active, setLanding2Active] = useState(false);
  const [landingProgress, setLandingProgress] = useState(1);
  const [scrollRatio, setScrollRatio] = useState(0);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;

      // 1 (100vh) + 0.5 (extra space)
      const isMobile = window.innerWidth < 768;
      const multiplier = isMobile ? 1 : 1.5;
      if (scrollY >= multiplier * vh) {
        setLanding2Active(true);
      }

      // Opacity for landing page when scrolling
      const landingProgress = 1 - Math.min(scrollY / vh, 1);
      setLandingProgress(landingProgress);

      const homeHeight = 1.5 * vh;
      const maxPageScroll = document.body.scrollHeight - window.innerHeight;
      const effective = Math.max(0, scrollY - homeHeight);
      const trackScrollSpan = maxPageScroll - homeHeight;
      const ratio =
        trackScrollSpan > 0 ? Math.min(effective / trackScrollSpan, 1) : 0;
      setScrollRatio(ratio);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    
      <div className="relative w-full">

        <div className="h-full">
          <Routes>
            {/* Home Page Route */}
            <Route path = "/" element={ <> 
              <MLHBadge />
              <Navbar />
              <Home landing2Active={landing2Active} progress={landingProgress} />
          <div className="relative bg-gradient-to-b from-purple3 to-purple4">
            {/* ScrollBar */}
            <div className="hidden md:block">
              <ScrollBar ratio={scrollRatio} />
              <ScrollBarTrack />
            </div>

            {/* Main Content */}
            <About className="" />
            <Tracks className="" />
            <Schedule className="" />
            <FAQ className="" />
            <Sponsors className="" />
            <Footer />
          </div>
          </>
            } />
            {/* Login Page Route */}
            <Route path = "/login" element={<Login />} />
            {/* Signup Page Route */}
            <Route path = "/signup" element={<Signup />} />
            {/* Temporary Route to Test Sidebar */}
            <Route path="/test-sidebar" element={
              <div className="flex">
                <Sidebar />
                <main className="ml-64 flex-1 p-8">
                  <h1 className="text-3xl font-poppins">Testing Sidebar</h1>
                </main>
              </div>
            } />
            {/* Dashboard Page Route */}
            <Route path="/dashboard" element={<Dashboard />} />
            {/* Profile Page Route */}
            <Route path="/profile" element={<Profile />} />
            {/* Register Page Route */}
            <Route path="/register" element={<Register />} />
            {/* Team Page Route */}
            <Route path="/team" element={<Team />} />
          </Routes>
        </div>
      </div>
  );
}

export default App;
