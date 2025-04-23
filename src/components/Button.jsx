import React from "react";
import { HashLink as Link } from "react-router-hash-link";

const Button = ({ text, href, download, onClick, type }) => {
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

  // For asset links (like resume), handle mobile device compatibility
  if (href && href.startsWith("/assets")) {
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    // If mobile, use regular anchor tag with target="_blank" to let the device handle it natively
    if (isMobile) {
      return (
        <a
          href={href}
          className={buttonStyle}
          target="_blank"
          rel="noopener noreferrer"
        >
          {text}
        </a>
      );
    }

    // For desktop, use download attribute
    return (
      <a
        href={href}
        download="Rajesh-Pandey-Resume.pdf"
        className={buttonStyle}
        onClick={(e) => e.stopPropagation()}
      >
        {text}
      </a>
    );
  }

  // Otherwise render as internal navigation link
  return (
    <Link to={href || "#"} className={buttonStyle}>
      {text}
    </Link>
  );
};

export default Button;
