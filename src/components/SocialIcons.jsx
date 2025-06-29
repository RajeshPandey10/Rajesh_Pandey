import React from "react";
import { FaLinkedin, FaFacebook, FaGithub, FaInstagram } from "react-icons/fa";
import { motion } from "framer-motion";

const SocialIcons = () => {
  const icons = [
    {
      href: "https://www.linkedin.com/in/rajesh-pandey-915649286/",
      component: <FaLinkedin />,
      color: "from-blue-600 to-blue-700",
      hoverColor: "hover:shadow-blue-500/50",
      name: "LinkedIn",
    },
    {
      href: "https://www.facebook.com/profile.php?id=100065321473452",
      component: <FaFacebook />,
      color: "from-blue-500 to-blue-600",
      hoverColor: "hover:shadow-blue-400/50",
      name: "Facebook",
    },
    {
      href: "https://github.com/RajeshPandey10",
      component: <FaGithub />,
      color: "from-gray-700 to-gray-800",
      hoverColor: "hover:shadow-gray-400/50",
      name: "GitHub",
    },
    {
      href: "https://www.instagram.com/rajesh_pandey1/",
      component: <FaInstagram />,
      color: "from-pink-500 to-rose-600",
      hoverColor: "hover:shadow-pink-500/50",
      name: "Instagram",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const iconVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15,
      },
    },
    hover: {
      y: -5,
      scale: 1.2,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  };

  return (
    <motion.div
      className="flex space-x-6 justify-center md:justify-start"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {icons.map((icon, index) => (
        <motion.a
          key={index}
          href={icon.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`relative group p-3 rounded-full bg-gradient-to-br ${icon.color} text-white shadow-lg hover:shadow-xl ${icon.hoverColor} transition-all duration-300`}
          variants={iconVariants}
          whileHover="hover"
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            className="text-xl"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            {icon.component}
          </motion.div>

          {/* Tooltip */}
          <motion.div
            className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            initial={{ opacity: 0, y: 5 }}
            whileHover={{ opacity: 1, y: 0 }}
          >
            {icon.name}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
          </motion.div>

          {/* Ripple effect */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-white/30"
            initial={{ scale: 1, opacity: 0 }}
            whileHover={{
              scale: 1.5,
              opacity: [0, 1, 0],
              transition: { duration: 0.6, repeat: Infinity },
            }}
          />
        </motion.a>
      ))}
    </motion.div>
  );
};

export default SocialIcons;
