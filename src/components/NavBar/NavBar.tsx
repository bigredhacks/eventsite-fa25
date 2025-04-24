import { useEffect, useState } from "react";
import brhLogoWhite from "@/assets/brh_logo_white.png";
import menuOpenButton from "@/assets/menu_open.png";
import menuCloseButton from "@/assets/menu_close.png";
import NavButtonSet from "./NavButtonSet";

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
      setIsMobileMenuOpen(false); // Hide Mobile Menu because scrolling detected
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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <div
      className={`
        fixed top-0 w-full z-50 h-fit 
        bg-purple3/50 text-white2 font-jersey10
        md:py-2 py-2
        md:pl-6 pl-6
        md:pr-28 pr-8
        transition-transform duration-500 
         ${show ? "translate-y-0" : "-translate-y-full"}`}
      //  duration-500 determines speed of NavBar moving
    >
      {/* NavBar Top Row */}
      <div className="flex items-center justify-between px-4 py-2">
        <img src={brhLogoWhite} alt="BRH logo" className="md:h-18 h-12 z-100" />

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-[2.5vw] text-2xl px-4">
          <NavButtonSet
            setDisableHideUntil={setDisableHideUntil}
            onLinkClick={toggleMobileMenu}
          />
        </div>

        {/* Mobile Toggle NavBar Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden transition-transform duration-300 ease-in-out md:h-18 h-12 z-100"
        >
          <img
            src={isMobileMenuOpen ? menuCloseButton : menuOpenButton}
            className={`transform transition-transform duration-300 ease-in-out ${
              isMobileMenuOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`
          md:hidden overflow-hidden fixed top-0 left-0
          w-full z-90
          bg-purple5/95 text-white2 font-jersey10
          transition-[max-height] duration-500 ease-in-out
          ${isMobileMenuOpen ? "max-h-[100vh]" : "max-h-0 overflow-hidden"}
        `}
      >
        <div
          className="flex flex-col items-center justify-end 
          gap-2.5 pt-24 pb-6 px-6 text-2xl"
        >
          <NavButtonSet
            setDisableHideUntil={setDisableHideUntil}
            onLinkClick={toggleMobileMenu}
          />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
