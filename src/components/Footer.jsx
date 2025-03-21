import React from "react";
import SocialIcons from "./SocialIcons";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      id="footer"
      className="bg-gray-900 text-white py-8 relative overflow-hidden"
    >
      <div className="container mx-auto text-center relative z-10">
        {/* Social Media Links */}
        <div className="mb-4 flex justify-center">
          <SocialIcons />
        </div>

        {/* Footer Text */}
        <p className="text-gray-400 text-sm">
          Made with{" "}
          <span className="text-lg font-bold animate-color-cycle">❤️</span> by{" "}
          <span className="font-bold text-white">Rajesh</span>
        </p>
        <p className="text-gray-500 text-xs mt-2">
          © {new Date().getFullYear()} Rajesh Pandey. All rights reserved.
        </p>

      
      </div>
    </footer>
  );
};

export default Footer;