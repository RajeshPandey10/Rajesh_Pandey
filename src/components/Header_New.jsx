import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { HashLink as Link } from "react-router-hash-link";

const SANSKRIT_SHLOKA =
  "निर्मानमोहा जितसङ्गदोषा अध्यात्मनित्या विनिवृत्तकामा द्वन्द्वैर्विमुक्ता सुखदुःखसंज्ञै गच्छन्त्यमूढा पदमव्ययं तत् 🕉️";

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

  useEffect(() => {
    const handleScroll = () => {
      const sections = links.map((link) => document.getElementById(link.data));
      const scrollPosition = window.scrollY + 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section) {
          const sectionTop = section.offsetTop;
          if (scrollPosition >= sectionTop) {
            setActiveSection(links[i].data);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (sectionId) => {
    setActiveSection(sectionId);
    setNav(false);
  };

  return (
    <>
      {/* Sanskrit Shloka Bar */}
      <div className="sanskrit-bar">
        <div className="container">
          <div className="sanskrit-content">
            <span className="sanskrit-text">{SANSKRIT_SHLOKA}</span>
            <span className="name-devanagari">राजेश</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            <Link to="/#home" className="logo">
              Rajesh Pandey
            </Link>

            {/* Desktop Navigation */}
            <nav className="nav-links">
              {links.map(({ id, data }) => (
                <Link
                  key={id}
                  to={`/#${data}`}
                  className={`nav-link ${
                    activeSection === data ? "active" : ""
                  }`}
                  onClick={() => handleLinkClick(data)}
                  smooth
                >
                  {data.charAt(0).toUpperCase() + data.slice(1)}
                </Link>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="mobile-menu-btn"
              onClick={() => setNav(!nav)}
              aria-label="Toggle mobile menu"
            >
              {nav ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {nav && (
          <div className="mobile-nav">
            <div className="mobile-nav-content">
              {links.map(({ id, data }) => (
                <Link
                  key={id}
                  to={`/#${data}`}
                  className={`mobile-nav-link ${
                    activeSection === data ? "active" : ""
                  }`}
                  onClick={() => handleLinkClick(data)}
                  smooth
                >
                  {data.charAt(0).toUpperCase() + data.slice(1)}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
