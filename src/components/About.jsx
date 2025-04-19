import React from "react";
import { motion } from "framer-motion";
import { FaGraduationCap, FaBriefcase, FaLandmark } from "react-icons/fa";
import { MdLocalActivity } from "react-icons/md";
const About = () => {
  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <div
      id="about-section"
      className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white  px-6 py-5"
    >
      <motion.div
        className="container mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <motion.h1
          className="text-5xl font-bold mb-16 text-center relative"
          variants={cardVariants}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            About Me
          </span>
          <motion.span
            className="absolute bottom-0 left-1/2 w-20 h-1 bg-blue-500 rounded-full"
            initial={{ width: 0, x: "-50%" }}
            whileInView={{ width: 80, x: "-50%" }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          ></motion.span>
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Career Card */}
          <motion.div
            className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-700 transform hover:-translate-y-2 transition-transform duration-300 group"
            variants={cardVariants}
            whileHover={{ boxShadow: "0 0 25px rgba(59, 130, 246, 0.5)" }}
          >
            <div className="flex justify-center">
              <motion.div
                className="p-4 bg-blue-500 rounded-full text-white mb-6 group-hover:bg-blue-400 transition-colors"
                animate={{ rotate: [0, 10, 0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                <FaBriefcase size={30} />
              </motion.div>
            </div>
            <h2 className="text-2xl font-semibold mb-4 text-center text-blue-400">
              Career
            </h2>
            <p className="text-gray-300 text-center">
            As a dedicated and ambitious Computer Engineering student in my 7th semester, I am passionate about harnessing the power of technology to create innovative solutions. My coursework has been continuously equipping me with a strong foundation in programming, hardware, and software development. I'm eager to apply my knowledge and gain practical experience in the field.

            I am an avid problem solver, continuously seeking opportunities to learn and grow in the ever-evolving tech landscape. My desire to contribute to real-world projects and my ability to adapt quickly make me a valuable addition to any team.
            </p>

            <motion.div
              className="w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 mt-6 rounded-full origin-left"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </motion.div>

          {/* Education Card */}
          <motion.div
            className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-700 transform hover:-translate-y-2 transition-transform duration-300 group"
            variants={cardVariants}
            whileHover={{ boxShadow: "0 0 25px rgba(168, 85, 247, 0.5)" }}
          >
            <div className="flex justify-center">
              <motion.div
                className="p-4 bg-purple-500 rounded-full text-white mb-6 group-hover:bg-purple-400 transition-colors"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <FaGraduationCap size={30} />
              </motion.div>
            </div>
            <h2 className="text-2xl font-semibold mb-4 text-center text-purple-400">
              Education
            </h2>
            <p className="text-gray-300 text-center">
            During my +2 school, I studied science, which inspired my interest in technology and logical problem solving. Building on this basis, I am surrently doing  my Bachelor's degree in Computer Engineering, an intensive curriculum that honed my skills in software development, algorithms, and system architecture. This academic journey has provided me with both analytical thinking and practical engineering abilities, allowing me to solve complicated challenges and create in the realm of technology.
            </p>

            <motion.div
              className="w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500 mt-16 rounded-full origin-left"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </motion.div>

          {/* Personel details*/}
          <motion.div
            className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-700 transform hover:-translate-y-2 transition-transform duration-300 group"
            variants={cardVariants}
            whileHover={{ boxShadow: "0 0 25px rgba(239, 68, 68, 0.5)" }}
          >
            <div className="flex justify-center">
              <motion.div
                className="p-4 bg-red-500 rounded-full text-white mb-6 group-hover:bg-red-400 transition-colors"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <FaLandmark size={30} />
              </motion.div>
            </div>
            <h2 className="text-2xl font-semibold mb-4 text-center text-red-400">
              Childhood
            </h2>
            <p className="text-gray-300 text-center">
            I was born in 2005 in the serene hills of Nuwakot, where nature’s calmness shaped my earliest memories. Growing up in a humble village, I studied at Shree Shakti Secondary School, a government institution that played a big role in molding my values and character. My childhood was filled with laughter, dreams, and endless games. I found joy in the simple pleasures of life—playing cricket under the sun and chess during the quiet evenings. Those carefree days taught me resilience, creativity, and the beauty of living close to nature. They were not just moments, but memories etched deep in my heart.

            </p>

            <motion.div
              className="w-full h-1 bg-gradient-to-r from-red-500 to-orange-500 mt-6 rounded-full origin-left"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </motion.div>
          <motion.div
            className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-700 transform hover:-translate-y-2 transition-transform duration-300 group"
            variants={cardVariants}
            whileHover={{ boxShadow: "0 0 25px rgba(239, 68, 68, 0.5)" }}
          >
            <div className="flex justify-center">
              <motion.div
                className="p-4 bg-green-500 rounded-full text-white mb-6 group-hover:bg-green-400 transition-colors"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <MdLocalActivity
                size={30} />
              </motion.div>
            </div>
            <h2 className="text-2xl font-semibold mb-4 text-center text-red-400">
              Hobbies
            </h2>
            <p className="text-gray-300 text-center">
            I am actively involved in extracurricular activities that promote creativity, critical thinking, and teamwork. I appreciate chess for its strategic depth, and cricket for its vibrant team spirit. In addition, I've taken part in a number of science shows, where I've presented novel ideas and investigated emerging technologies. These activities show my desire to study outside of the classroom, as well as my enjoyment of both mental and physical difficulties.

            </p>

            <motion.div
              className="w-full h-1 bg-gradient-to-r from-red-500 to-orange-500 mt-24 rounded-full origin-left"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default About;
