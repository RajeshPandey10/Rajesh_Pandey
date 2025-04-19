import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "@motionone/utils";

const Skills = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [filtered, setFiltered] = useState([]);
  const [visibleSkills, setVisibleSkills] = useState([]);
  const [isHovering, setIsHovering] = useState(null);

  const categories = [
    "All", 
    "Frontend", 
    "Backend", 
    "Database", 
    "Language", 
    "Animation"
  ];

  const skillData = [
    {
      name: "React.js",
      category: "Frontend",
      level: 90,
      description: "Building dynamic UIs and SPAs.",
      image: "https://cdn-icons-png.flaticon.com/512/919/919851.png",
    },
    {
      name: "Node.js",
      category: "Backend",
      level: 85,
      description: "Server-side development and APIs.",
      image: "https://cdn-icons-png.flaticon.com/512/919/919825.png",
    },
    {
      name: "MongoDB",
      category: "Database",
      level: 80,
      description: "NoSQL database management.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMzlF0cI1C-682U2HcOpqjigAIxmhmEuBmdA&s",
    },
    {
      name: "Tailwind CSS",
      category: "Frontend",
      level: 95,
      description: "Modern, responsive styling.",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/2560px-Tailwind_CSS_Logo.svg.png",
    },
    {
      name: "MySQL",
      category: "Database",
      level: 75,
      description: "Relational database management.",
      image: "https://cdn-icons-png.flaticon.com/512/919/919836.png",
    },
    {
      name: "C",
      category: "Language",
      level: 70,
      description: "General-purpose programming language.",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/C_Programming_Language.svg/1200px-C_Programming_Language.svg.png",
    },
    {
      name: "C++",
      category: "Language",
      level: 80,
      description: "Object-oriented programming language.",
      image: "https://w7.pngwing.com/pngs/646/751/png-transparent-the-c-programming-language-computer-programming-programmer-others-blue-class-logo-thumbnail.png",
    },
    {
      name: "Python",
      category: "Language",
      level: 85,
      description: "Used for web development and machine learning projects.",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1200px-Python-logo-notext.svg.png",
    },
    {
      name: "JavaScript",
      category: "Language",
      level: 95,
      description: "High-level, dynamic programming language.",
      image: "https://cdn-icons-png.flaticon.com/512/919/919828.png",
    },
    {
      name: "GSAP",
      category: "Animation",
      level: 75,
      description: "JavaScript library for animations.",
      image: "https://pbs.twimg.com/profile_images/1713633504431394816/h28jJ1qM_400x400.jpg",
    },
    {
      name: "Framer Motion",
      category: "Animation",
      level: 80,
      description: "Production-ready animation library for React.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh4W9UdwgDLj84iQghY9wW24eJvc_m5QFXmg&s",
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const skillVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    },
    hover: { 
      scale: 1.05,
      boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)",
      transition: { type: "spring", stiffness: 300, damping: 10 }
    }
  };

  const filterVariants = {
    inactive: { scale: 1 },
    active: { 
      scale: 1.1, 
      color: "#ef4444", 
      fontWeight: "bold",
      transition: { type: "spring", stiffness: 300 }
    }
  };

  // Filter skills based on category
  useEffect(() => {
    if (activeFilter === "All") {
      setFiltered(skillData);
      
      // Add skills with staggered delay for initial animation
      const timer = setTimeout(() => {
        setVisibleSkills(skillData);
      }, 500);
      
      return () => clearTimeout(timer);
    } else {
      const filteredData = skillData.filter(skill => skill.category === activeFilter);
      setFiltered(filteredData);

      // Reset and then set visible skills with animation
      setVisibleSkills([]);
      const timer = setTimeout(() => {
        setVisibleSkills(filteredData);
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [activeFilter]);

  // Handle skill animation on interval
  useEffect(() => {
    if (isHovering) return;

    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * filtered.length);
      setIsHovering(randomIndex);
      
      const timeout = setTimeout(() => {
        setIsHovering(null);
      }, 1500);
      
      return () => clearTimeout(timeout);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [filtered, isHovering]);

  return (
    <section id="skills" className="bg-gradient-to-b from-gray-900 to-black w-full  px-8 lg:px-16 overflow-hidden">
      <div className="max-w-6xl py-5 mx-auto text-center">
        <motion.h2 
          className="text-orange-500 text-3xl lg:text-5xl font-bold mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          My Skills
        </motion.h2>
        
        {/* Filter buttons */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {categories.map((category, index) => (
            <motion.button
              key={index}
              onClick={() => setActiveFilter(category)}
              className={`px-6 py-2 rounded-full ${
                activeFilter === category 
                  ? "bg-red-500 text-white" 
                  : "bg-gray-800 text-white hover:bg-gray-700"
              } transition-all duration-300`}
              variants={filterVariants}
              initial="inactive"
              animate={activeFilter === category ? "active" : "inactive"}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>
        
        {/* Skills grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <AnimatePresence mode="wait">
            {filtered.map((skill, index) => (
              <motion.div
                key={skill.name}
                layoutId={skill.name}
                variants={skillVariants}
                initial="hidden"
                animate={isHovering === index ? "hover" : "show"}
                exit={{ opacity: 0, scale: 0.5 }}
                whileHover="hover"
                className="bg-gradient-to-tr from-gray-800 to-gray-700 rounded-xl p-6 flex flex-col items-center justify-between h-full shadow-lg relative overflow-hidden"
              >
                {/* Skill level indicator */}
                <motion.div 
                  className="absolute bottom-0 left-0 h-1 bg-red-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
                />
                
                <motion.div 
                  className="w-16 h-16 rounded-full bg-gray-900 p-3 mb-4 flex items-center justify-center"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                >
                  <img
                    src={skill.image}
                    alt={`${skill.name} Icon`}
                    className="w-full h-full object-contain"
                  />
                </motion.div>
                
                <motion.h3 
                  className="text-xl font-bold mb-2 text-red-400"
                  animate={{ 
                    color: isHovering === index ? ["#f87171", "#60a5fa", "#f87171"] : "#f87171" 
                  }}
                  transition={{ duration: 2, repeat: isHovering === index ? Infinity : 0 }}
                >
                  {skill.name}
                </motion.h3>
                
                <motion.span 
                  className="px-3 py-1 bg-gray-900 rounded-full text-xs text-gray-300 mb-3"
                  whileHover={{ scale: 1.1, backgroundColor: "#374151" }}
                >
                  {skill.category}
                </motion.span>
                
                <motion.p 
                  className="text-sm text-gray-300 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  {skill.description}
                </motion.p>
                
                <motion.div 
                  className="w-full mt-4 bg-gray-900 h-2 rounded-full overflow-hidden"
                >
                  <motion.div 
                    className="h-full bg-gradient-to-r from-red-500 to-orange-400"
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ delay: 1, duration: 1.5, ease: "easeOut" }}
                  />
                </motion.div>
                <motion.span className="text-xs text-gray-400 mt-1">
                  Proficiency: {skill.level}%
                </motion.span>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {/* Floating animated balls in background */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-red-500/20 to-orange-500/20 blur-xl"
            style={{
              width: Math.random() * 200 + 50,
              height: Math.random() * 200 + 50,
            }}
            animate={{
              x: [
                Math.random() * 1000 - 500,
                Math.random() * 1000 - 500,
                Math.random() * 1000 - 500,
              ],
              y: [
                Math.random() * 1000 - 500,
                Math.random() * 1000 - 500,
                Math.random() * 1000 - 500,
              ],
              scale: [0.8, 1.2, 0.8],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Skills;