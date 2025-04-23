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

  // For asset links (like resume), use approach that works with sandboxed environments
  if (href && href.startsWith("/assets")) {
    // Always use target="_blank" to open in a new tab to avoid sandbox restrictions
    // This works more reliably across devices and deployed environments
    return (
      <a
        href={href}
        className={buttonStyle}
        target="_blank"
        rel="noopener noreferrer"
        // Avoid using download attribute which can trigger sandbox restrictions
        onClick={(e) => {
          e.stopPropagation();
        }}
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
