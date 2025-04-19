import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { HashLink as Link } from "react-router-hash-link";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [nav, setNav] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const links = [
    { id: 1, data: "home" },
    { id: 2, data: "about" },
    { id: 3, data: "skills" },
    { id: 4, data: "portfolio" },
    { id: 5, data: "experience" },
    { id: 6, data: "contact" },
  ];

  // Function to check which section is currently in view
  useEffect(() => {
    const handleScroll = () => {
      const sections = links.map((link) => document.getElementById(link.data));
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      // Find the current section
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;

          if (
            scrollPosition >= sectionTop &&
            scrollPosition <= sectionTop + sectionHeight
          ) {
            setActiveSection(links[i].data);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Initial check on load
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Function to handle link clicks
  const handleLinkClick = (sectionId) => {
    setActiveSection(sectionId);
    setNav(false); // Close mobile menu when a link is clicked
  };

  return (
    <motion.div
      className="relative flex justify-between px-4 items-center bg-gray-900/95 backdrop-blur-sm w-full h-20 sticky top-0 z-50"
      animate={{ boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-3xl ml-2 hover:scale-110 text-red-500 font-extrabold">
        <Link to="/admin/login">RAJESH</Link>
      </div>

      {/* Desktop Menu - Always visible */}
      <ul className="hidden md:flex gap-6">
        {links.map((link) => (
          <motion.li
            key={link.id}
            className={`text-1.5xl px-4 py-2 capitalize cursor-pointer hover:scale-105 duration-200 rounded-md border-b ${
              activeSection === link.data
                ? "text-red-500 border-red-500 bg-gray-800/50"
                : "text-gray-300 border-transparent hover:text-red-500 hover:border-red-500 hover:bg-gray-800/30"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              smooth
              to={`/${link.data}`}
              onClick={() => handleLinkClick(link.data)}
            >
              {link.data}
            </Link>
          </motion.li>
        ))}
      </ul>

      {/* Mobile Menu Icon */}
      <div
        onClick={() => setNav(!nav)}
        className="md:hidden cursor-pointer pr-4 z-10 text-gray-300"
      >
        {nav ? <FaTimes size={20} /> : <FaBars size={20} />}
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {nav && (
          <motion.ul
            className="flex flex-col items-center justify-center absolute top-0 left-0 w-full h-screen [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"
            initial={{ opacity: 0, clipPath: "circle(0% at top right)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at top right)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at top right)" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {links.map((link) => (
              <motion.li
                key={link.id}
                className={`text-2xl py-4 capitalize cursor-pointer border-b duration-200 ${
                  activeSection === link.data
                    ? "text-red-500 border-red-500 scale-105"
                    : "text-white border-transparent hover:text-red-500 hover:border-red-500 hover:scale-105"
                }`}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * link.id }}
              >
                <Link
                  onClick={() => handleLinkClick(link.data)}
                  smooth
                  to={`/${link.data}`}
                >
                  {link.data}
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

    </motion.div>
  );
};

export default Header;