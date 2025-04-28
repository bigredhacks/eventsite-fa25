import { FaInstagram, FaLinkedin, FaEnvelope } from "react-icons/fa";
import brhLogoBlack from "@/assets/brh_logo_black.png";

export default function Footer() {
  return (
    <div
      className="w-full flex flex-col md:flex-row 
                 bg-purple6 font-sans font-semibold text-black
                 justify-between items-center px-36 py-8"
    >
      {/* Left Section */}
      <div className="flex flex-col items-start space-y-4">
        <img src={brhLogoBlack} alt="Big Red Hacks Logo" className="h-16" />
        <p className="text-2xl">Made with ❤️ by BigRed//Hacks</p>
        <div className="flex flex-col space-y-1">
          <p className="text-lg">
            Registered Student Organization of Cornell University
          </p>
          <p className="text-lg">MLH Code of Conduct</p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex flex-col items-end space-y-4">
        <p className="text-lg font-semibold">contact us!</p>
        {/* Logos */}
        <div className="flex space-x-4 mr-0.5">
          <a href="#" aria-label="Instagram">
            <FaInstagram className="text-2xl hover:opacity-80" />
          </a>
          <a href="#" aria-label="LinkedIn">
            <FaLinkedin className="text-2xl hover:opacity-80" />
          </a>
          <a href="#" aria-label="Email">
            <FaEnvelope className="text-2xl hover:opacity-80" />
          </a>
        </div>
      </div>
    </div>
  );
}
