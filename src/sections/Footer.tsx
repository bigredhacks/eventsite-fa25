import { FaInstagram, FaLinkedin, FaEnvelope } from "react-icons/fa";
import brhLogoWhite from "@/assets/brh_logo_white.png";

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-b from-purple-600 to-purple-400">
      <div className="bg-purple-200 flex flex-col md:flex-row justify-between items-center px-24 py-6">
        <div className="flex flex-col items-start space-y-4">
          <div className="flex items-center space-x-3">
            <img src={brhLogoWhite} alt="Big Red Hacks Logo" className="h-16" />
          </div>
          <p className="text-lg font-semibold">Made with ❤️ by BigRed//Hacks</p>
          <p className="text-md">
            Registered Student Organization of Cornell University
          </p>
          <p className="text-md">MLH Code of Conduct</p>
        </div>

        {/* Right Section */}
        <div className="flex flex-col items-center space-y-4">
          <p className="text-lg font-semibold">contact us!</p>
          <div className="flex space-x-4">
            <a href="#" aria-label="Instagram">
              <FaInstagram className="text-2xl" />
            </a>
            <a href="#" aria-label="LinkedIn">
              <FaLinkedin className="text-2xl" />
            </a>
            <a href="#" aria-label="Email">
              <FaEnvelope className="text-2xl" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
