
import React, { useState, useEffect } from "react";
import SocialIcons from "./SocialIcons";

const Footer = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isCursorActive, setIsCursorActive] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const footer = document.getElementById("footer");
      const rect = footer.getBoundingClientRect();

      // Check if the cursor is within the footer area
      if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      ) {
        setCursorPosition({ x: e.clientX, y: e.clientY });
        setIsCursorActive(true);
      } else {
        setIsCursorActive(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <footer
      id="footer"
      className="bg-gray-900 text-white py-8 relative overflow-hidden"
    >
      {/* Custom Cursor */}
      {isCursorActive && (
        <div
          className="absolute w-8 h-8 bg-red-500 rounded-full pointer-events-none animate-pulse"
          style={{
            top: cursorPosition.y - 16,
            left: cursorPosition.x - 16,
            transform: "translate(-50%, -50%)",
          }}
        ></div>
      )}

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