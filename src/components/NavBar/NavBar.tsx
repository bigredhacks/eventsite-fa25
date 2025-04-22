import { useEffect, useState } from "react";
import NavButton from "./NavButton";
import brhLogoWhite from "@/assets/brh_logo_white.png";

const NavBar: React.FC = () => {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [disableHideUntil, setDisableHideUntil] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const threshold = 100;

  useEffect(() => {
    const handleScroll = () => {
      const currentTime = Date.now();
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY;

      // Skip scroll hide logic when smooth scrolling to a section
      if (currentTime < disableHideUntil) {
        setLastScrollY(currentScrollY);
        return;
      }
      if (Math.abs(scrollDelta) < threshold) {
        return; // No change during minor scrolling
      }
      if (scrollDelta > 0) {
        setShow(false); // Scrolling down: hide
      } else {
        setShow(true); // Scrolling up: show
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, disableHideUntil]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <div
      className={`
        fixed top-0 w-full z-50 h-fit 
        bg-purple3/50 text-white2 font-jersey10 py-4 pl-12 pr-38
        transition-transform duration-500 
         ${show ? "translate-y-0" : "-translate-y-full"}`}
      //  duration-500 determines speed of NavBar moving
    >
      <div className="flex items-center justify-between">
        <img src={brhLogoWhite} alt="BRH logo" className="h-18" />
        <div className="flex gap-12 text-2xl">
          <NavButton targetId="about" setDisableHideUntil={setDisableHideUntil}>
            About
          </NavButton>
          <NavButton
            targetId="tracks"
            setDisableHideUntil={setDisableHideUntil}
          >
            Tracks
          </NavButton>
          <NavButton
            targetId="schedule"
            setDisableHideUntil={setDisableHideUntil}
          >
            Schedule
          </NavButton>
          <NavButton targetId="faq" setDisableHideUntil={setDisableHideUntil}>
            FAQ
          </NavButton>
          <button
            className="text-yellow2 
              border border-yellow2 rounded-full 
              px-8 py-1 -mx-3
              hover:bg-yellow2 hover:text-purple3 transition"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
