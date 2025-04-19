import React, { useState } from 'react';
import { FaBars, FaTimes } from "react-icons/fa";
import { HashLink as Link } from 'react-router-hash-link';

const Header = () => {
  const [nav, setNav] = useState(false);

  const links = [
  
    {
      id: 2,
      data: "about",
    },
    {
      id: 3,
      data: "skills",
    },
    {
      id: 4,
      data: "portfolio",
    },
    {
      id: 5,
      data: "experience",
    },
    
    {
      id: 6,
      data: "contact",
    },
  ];

  return (
    <div className=" flex justify-between px-4 items-center bg-gray-900 w-full h-20 sticky top-0 z-50">
      <div className="text-3xl ml-2 hover:scale-110 text-red-500 font-extrabold">
      <Link
            to="/admin/login"
          >
            RAJESH
          </Link>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex ">
        {links.map((link) => (
          <li
            key={link.id}
            className="text-1.5xl m-8 hover:text-red-500 capitalize cursor-pointer text-gray-300 hover:scale-105 duration-200 border-b border-transparent hover:border-red-500"
          >
            <Link smooth to={`/#${link.data}`}>{link.data}</Link>
          </li>
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
      {nav && (
        <ul className="flex flex-col items-center justify-center absolute top-0 left-0 w-full h-screen [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
          {links.map((link) => (
            <li
              key={link.id}
              className="text-2xl py-4 capitalize cursor-pointer hover:text-red-500 border-b border-transparent hover:border-red-500 hover:scale-105 duration-200"
            >
              <Link onClick={() => setNav(!nav)} smooth to={`/#${link.data}`}>{link.data}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Header;
