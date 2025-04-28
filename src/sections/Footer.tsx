import { FaInstagram, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import brhLogoWhite from '@/assets/brh_logo_white.png';

export default function Footer() {
  return (
    <footer className="w-full bg-purple-200">
      <div className="flex flex-col md:flex-row justify-between items-center px-8 md:px-24 py-8 text-black">
        <div className="flex flex-col items-start space-y-2">
          <div className="flex items-center space-x-3">
            <img src={brhLogoWhite} alt="Big Red Hacks Logo" className="h-12 brightness-0" />
          </div>
          <p className="text-lg">Made with &lt;3 by BigRed//Hacks</p>
          <p className="text-md">Registered Student Organization of Cornell University</p>
          <p className="text-md">MLH Code of Conduct</p>
        </div>

        {/* Right Section */}
        <div className="flex flex-col items-end mt-6 md:mt-0">
          <p className="text-lg mb-2">contact us!</p>
          <div className="flex space-x-4">
            <a href="#" aria-label="Instagram" className="hover:opacity-80">
              <FaInstagram className="text-2xl" />
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:opacity-80">
              <FaLinkedin className="text-2xl" />
            </a>
            <a href="#" aria-label="Email" className="hover:opacity-80">
              <FaEnvelope className="text-2xl" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
