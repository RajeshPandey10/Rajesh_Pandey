import React from "react";
import { HashLink as Link } from "react-router-hash-link";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const Button = ({ text, href, download }) => {
  const isExternal = href.startsWith("/assets"); // Check if it's an external link

  const buttonVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.05,
      boxShadow: "0 0 25px rgba(100, 255, 218, 0.6)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10,
      },
    },
    tap: { scale: 0.95 },
  };

  const iconVariants = {
    initial: { rotate: 0 },
    hover: {
      rotate: 180,
      transition: { duration: 0.3 },
    },
  };

  const baseClasses =
    "relative group px-6 sm:px-8 py-3 rounded-full font-semibold bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-2 border-transparent hover:from-cyan-400 hover:to-blue-400 overflow-hidden transition-all duration-500 flex items-center gap-2";

  const buttonContent = (
    <>
      <motion.div variants={iconVariants} initial="initial" whileHover="hover">
        <Sparkles size={18} />
      </motion.div>
      {text}
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
    </>
  );

  return (
    <motion.div
      variants={buttonVariants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      className="inline-block"
    >
      {isExternal ? (
        <a
          href={href}
          download={download}
          target="_blank"
          rel="noopener noreferrer"
          className={baseClasses}
        >
          {buttonContent}
        </a>
      ) : (
        <Link to={href} className={baseClasses}>
          {buttonContent}
        </Link>
      )}
    </motion.div>
  );
};

export default Button;
