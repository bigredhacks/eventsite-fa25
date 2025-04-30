import { useEffect, useState } from "react";
import "./App.css";

import Navbar from "./components/NavBar/NavBar";
import About from "./sections/About";
import Tracks from "./sections/Tracks";
import Schedule from "./sections/Schedule";
import FAQ from "./sections/FAQ";
import Sponsors from "./sections/Sponsors";
import Home from "./sections/Home";
import MLHBadge from "./components/MLHBadge";
import ScrollBarTrack from "./components/ScrollBar/ScrollBarTrack";
import Footer from "./sections/Footer";
// import ScrollBar from "./components/ScrollBar/ScrollBar";

function App() {
  const [landing2Active, setLanding2Active] = useState(false);
  const [landingProgress, setLandingProgress] = useState(1);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;

      // 1 (100vh) + 0.5 (extra space)
      if (scrollY >= (1 + 0.5) * vh) {
        setLanding2Active(true);
      }

      // Opacity for landing page when scrolling
      const landingProgress = 1 - Math.min(scrollY / vh, 1);
      setLandingProgress(landingProgress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="relative w-full">
        <MLHBadge />

        <Navbar />

        {/* Main Content */}
        <div className="h-full">
          <Home landing2Active={landing2Active} progress={landingProgress} />
          <div className="relative bg-gradient-to-b from-purple3 to-purple4">
            {/* ScrollBar */}
            <ScrollBarTrack />

            <About className="" />
            <Tracks className="" />
            <Schedule className="" />
            <FAQ className="" />
            <Sponsors className="" />
          </div>
          {/* Footer */}
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
