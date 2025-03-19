import React from 'react';
import { FaLinkedin, FaFacebook, FaGithub, FaInstagram } from "react-icons/fa";

const SocialIcons = () => {
  const icons = [
    {
      href: "https://www.linkedin.com",
      component: <FaLinkedin />,
    },
    {
      href: "https://www.facebook.com",
      component: <FaFacebook />,
    },
   
    {
      href: "https://www.github.com",
      component: <FaGithub />,
    },
    {
      href: "https://www.instagram.com",
      component: <FaInstagram />,
    },
  ];

  return (
    <div className=" flex  space-x-4 justify-center md:justify-start">
      {icons.map((icon, index) => (
        <a href={icon.href} key={index} target="_blank" rel="noopener noreferrer" className="text-red-500 w-10 h-10 flex items-center justify-center text-2xl border-2 border-red-500 rounded-full hover:bg-red-500 hover:text-black transition-colors hover:shadow-[0_0_15px_3px_rgba(255,0,0,0.8)] duration-300">
          {icon.component}
        </a>
      ))}
    </div>
  );
};

export default SocialIcons;