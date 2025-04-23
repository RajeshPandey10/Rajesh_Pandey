import React, { useEffect, useState } from "react";
import { HashLink as Link } from "react-router-hash-link";

const Button = ({ text, href, download, onClick, type }) => {
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  // Detect mobile device on component mount
  useEffect(() => {
    const checkDevice = () => {
      setIsMobileDevice(
        /Android|iPhone|iPad|iPod|Mobile|Windows Phone/i.test(
          navigator.userAgent
        ) || window.innerWidth < 768
      );
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  // Common button styling
  const buttonStyle =
    "px-4 sm:px-6 py-2 rounded-full text-red-500 border-2 font-semibold border-red-500 hover:bg-red-500 hover:text-black hover:shadow-[0_0_15px_3px_rgba(255,0,0,0.8)] transition-colors duration-500";

  // If onClick is provided, render as button with the original styling
  if (onClick) {
    return (
      <button onClick={onClick} className={buttonStyle} type={type || "button"}>
        {text}
      </button>
    );
  }

  // For asset links (like resume)
  if (href && href.startsWith("/assets")) {
    // Different behavior for mobile vs desktop
    if (isMobileDevice) {
      // Mobile: Direct download link or open in system viewer
      return (
        <a
          href={href}
          className={buttonStyle}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {download ? "Download " + text : text}
        </a>
      );
    } else {
      // Desktop: Use the onClick handler if provided (for modal)
      return (
        <button
          className={buttonStyle}
          onClick={onClick || (() => window.open(href, "_blank"))}
          type="button"
        >
          {text}
        </button>
      );
    }
  }

  // Otherwise render as internal navigation link
  return (
    <Link to={href || "#"} className={buttonStyle}>
      {text}
    </Link>
  );
};

export default Button;
