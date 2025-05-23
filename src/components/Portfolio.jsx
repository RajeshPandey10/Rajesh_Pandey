import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchProjects } from "../services/api";
import { getImageUrl } from "../utils/imageUtils";
import AdSense from "./AdSense";

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchProjects();
        setProjects(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading projects:", error);
        setIsLoading(false);
      }
    };
    loadProjects();
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const projectVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hover: {
      scale: 1.05,
      boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.3)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15,
      },
    },
    tap: {
      scale: 0.98,
    },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 300,
      },
    },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <section
      id="portfolio"
      className="bg-gradient-to-b from-gray-900 to-black min-h-screen py-5  px-6 relative overflow-hidden"
    >
      {/* Background decorations */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`bg-circle-${i}`}
          className="absolute rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 blur-3xl"
          style={{
            width: Math.random() * 300 + 100,
            height: Math.random() * 300 + 100,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [Math.random() * 100 - 50, Math.random() * 100 - 50],
            y: [Math.random() * 100 - 50, Math.random() * 100 - 50],
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15 + i * 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 text-transparent bg-clip-text">
            My Projects
          </h2>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "80px" }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="h-1 bg-blue-500 mx-auto"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-gray-400 mt-4 max-w-lg mx-auto"
          >
            Explore a curated selection of <a href="https://rajeshpandey10.com.np" className="text-green-500">Rajesh Pandey's work</a>, showcasing my skills in web
            development, design, and problem-solving
          </motion.p>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <motion.div
              className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
                {/* <AdSense/> */}
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence>
              {projects.map((project) => (
                <motion.div
                  layout
                  key={project._id}
                  variants={projectVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => setSelectedProject(project)}
                  className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-xl overflow-hidden cursor-pointer group"
                >
                  <motion.div className="relative overflow-hidden h-52">
                    <motion.img
                      src={getImageUrl(project.image)}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      initial={{ scale: 1.2, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                  </motion.div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-blue-400 group-hover:text-blue-300">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 text-sm line-clamp-3 mb-4">
                      {project.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <motion.a
                        href={project.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-white bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        Live Demo
                      </motion.a>
                      <motion.a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-white bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span className="flex items-center gap-1">
                          <svg
                            className="w-4 h-4"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                          >
                            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                          </svg>
                          Code
                        </span>
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Modal for project details */}
      <AnimatePresence>
        {selectedProject && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 flex items-center justify-center"
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                className="w-11/12 max-w-2xl bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl z-50 overflow-hidden"
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
              >
                <button
                  className="absolute top-4 right-4 text-white bg-gray-700 rounded-full p-2 z-50"
                  onClick={() => setSelectedProject(null)}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                <div className="h-64 overflow-hidden">
                  <motion.img
                    src={getImageUrl(selectedProject.image)}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                </div>

                <div className="p-8">
                  <h3 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    {selectedProject.title}
                  </h3>

                  <p className="text-gray-300 mb-8 leading-relaxed">
                    {selectedProject.description}
                  </p>

                  <div className="flex flex-wrap gap-4">
                    {selectedProject.demoLink && (
                      <motion.a
                        href={selectedProject.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-center font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        View Live Demo
                      </motion.a>
                    )}

                    {selectedProject.githubLink && (
                      <motion.a
                        href={selectedProject.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-center font-medium text-white bg-gray-700 px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        View Source Code
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
     <AdSense/>
    </section>
  );
};

export default Portfolio;
