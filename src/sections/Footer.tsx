import { FaInstagram, FaLinkedin, FaEnvelope } from "react-icons/fa";
import brhLogoBlack from "@/assets/brh_logo_black.png";

export default function Footer() {
  return (
    <div
      className="w-full flex flex-col md:flex-row 
                 bg-purple6 font-sans font-semibold text-black
                 justify-between items-end
                 md:px-36 px-12
                 pt-8 pb-12"
    >
      {/* Left Section */}
      <div className="flex flex-col items-start space-y-4">
        <img
          src={brhLogoBlack}
          alt="Big Red Hacks Logo"
          className="h-16 pointer-events-none select-none"
        />
        <p className="text-2xl pointer-events-none select-none">
          Made with ❤️ by BigRed//Hacks
        </p>
        <div className="flex flex-col space-y-1">
          <p className="text-lg pointer-events-none select-none">
            Registered Student Organization of Cornell University
          </p>
          <a
            href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf?_gl=1*aykpld*_ga*MTI2NDQwNTA1OS4xNzQ1MjcwNzEw*_ga_E5KT6TC4TK*MTc0NjAwNjIwNy43LjAuMTc0NjAwNjIwNy4wLjAuMA.."
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit text-lg hover:text-purple5"
          >
            MLH Code of Conduct
          </a>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex flex-col items-end space-y-4 mt-4 md:mt-0">
        <p className="text-lg font-semibold">contact us!</p>
        {/* Logos */}
        <div className="flex space-x-4 mr-0.5">
          <a
            href="https://www.instagram.com/bigredhacks/"
            aria-label="Instagram"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="text-2xl hover:text-purple5 hover:opacity-80" />
          </a>
          <a
            href="https://www.linkedin.com/company/bigredhacks/"
            aria-label="LinkedIn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="text-2xl hover:text-purple5 hover:opacity-80" />
          </a>
          <a
            href="mailto:bigredhacks@cornell.edu"
            aria-label="Email bigredhacks@cornell.edu"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaEnvelope className="text-2xl hover:text-purple5 hover:opacity-80" />
          </a>
        </div>
      </div>
    </div>
  );
}
