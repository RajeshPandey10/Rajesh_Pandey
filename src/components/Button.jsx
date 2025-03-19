import React from "react";
import { HashLink as Link } from "react-router-hash-link";

const Button = ({ text, href, download }) => {
  const isExternal = href.startsWith("/assets"); // Check if it's an external link
  return (
    <div className="py-10 inline-flex space-x-4 m-1">
      {isExternal ? (
        <a
          href={href}
          download={download}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 sm:px-6 py-4 rounded-full text-red-500 border-2 font-semibold border-red-500 hover:bg-red-500 hover:text-black hover:shadow-[0_0_15px_3px_rgba(255,0,0,0.8)] transition-colors duration-500"
        >
          {text}
        </a>
      ) : (
        <Link
          to={href}
          className="px-4 sm:px-6 py-4 rounded-full text-red-500 border-2 font-semibold border-red-500 hover:bg-red-500 hover:text-black hover:shadow-[0_0_15px_3px_rgba(255,0,0,0.8)] transition-colors duration-500"
        >
          {text}
        </Link>
      )}
    </div>
  );
};

export default Button;
