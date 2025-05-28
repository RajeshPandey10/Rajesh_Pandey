import React from "react";
import SocialIcons from "./SocialIcons";
import { motion } from "framer-motion";
import { FaHeart, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gradient-to-t from-black to-gray-900 text-white py-12 relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 z-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-blue-500 opacity-10"
            style={{
              width: Math.random() * 50 + 10,
              height: Math.random() * 50 + 10,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * -100 - 50],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Footer content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center">
          {/* Logo or brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2
              className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 cursor-pointer hover:scale-105 transition-transform"
              onClick={scrollToTop}
            >
              Rajesh Pandey
            </h2>
          </motion.div>

          {/* Social icons */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <SocialIcons />
          </motion.div>

          {/* Newsletter or contact */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-10 max-w-md text-center"
          >
            <div className="p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-gray-600 transition-colors">
              <h3 className="text-xl font-semibold mb-4">Stay Connected</h3>
              <p className="text-gray-400 mb-4">
                Follow me on social media or reach out directly to stay updated
                with my latest endeavors.
              </p>
              <a
                href="mailto:imrajesh2005@gmail.com"
                className="inline-flex items-center px-5 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-full transition-all transform hover:scale-105"
              >
                <FaEnvelope className="mr-2" />
                Contact Me
              </a>
            </div>
          </motion.div>
        </div>
        {/* Horizontal line */}
        <motion.div
          className="w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent mb-6"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        />

        <div className="container mx-auto text-center relative z-10">
          {/* Footer Text */}
          <motion.div
            className="flex flex-col md:flex-row justify-center items-center text-gray-400 text-sm space-y-2 md:space-y-0"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-400 text-sm">
              Made with{" "}
              <span className="text-lg font-bold animate-color-cycle">❤️</span>{" "}
              by{" "}
              <span className="font-bold text-white">
                <a href="https://rajeshpandey10.com.np">Rajesh Pandey</a>
              </span>
            </p>
          </motion.div>
          <p className="text-gray-500 text-xs mt-2">
            © {new Date().getFullYear()} Rajesh Pandey. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
