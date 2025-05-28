import React from "react";
import { motion } from "framer-motion";
import {
  FaSuitcase,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaCode,
  FaLaptopCode,
  FaServer,
} from "react-icons/fa";

const Experience = () => {
  const experiences = [
    {
      title: "Associate Backend Developer at Covosys",
      company: "Covosys",
      location: "Remote",
      period: "7 Months (Current)",
      description:
        "Developing and maintaining backend services using Node.js and Express. Integrating third-party APIs and optimizing database queries. Building RESTful APIs for web applications.",
      color: "blue",
      icon: <FaServer className="text-blue-400" size={20} />,
    },
    {
      title: "MERN Intern at Lunar IT",
      company: "Lunar IT",
      location: "Remote",
      period: "2 Months (Current)",
      description:
        "Collaborating on full-stack projects using the MERN stack (MongoDB, Express, React, Node.js). Creating dynamic user interfaces and RESTful APIs. Working in an agile team environment.",
      color: "purple",
      icon: <FaLaptopCode className="text-purple-400" size={20} />,
    },
    {
      title: "Virtual Intern at Codesoft",
      company: "Codesoft",
      location: "Remote",
      period: "1 Month",
      description:
        "Worked on building scalable backend systems and APIs for e-commerce platforms. Implemented secure authentication and payment gateway integrations.",
      color: "green",
      icon: <FaCode className="text-emerald-400" size={20} />,
    },
    {
      title: "Freelance Web Developer",
      company: "Self-employed",
      location: "Kathmandu, Nepal",
      period: "2022 - Present",
      description:
        "Designed and developed custom websites and web applications for various clients. Focused on responsive design, performance optimization, and SEO best practices.",
      color: "red",
      icon: <FaLaptopCode className="text-red-400" size={20} />,
    },
  ];

  const projects = [
    {
      title: "E-commerce Platform",
      technologies: "MERN Stack, Redux, Stripe",
      duration: "3 months",
      description:
        "Built a full-featured e-commerce platform with product catalog, shopping cart, user authentication, and payment processing.",
      color: "yellow",
      icon: <FaLaptopCode className="text-yellow-400" size={20} />,
    },
    {
      title: "Real-time Chat Application",
      technologies: "Socket.io, React, Express, MongoDB",
      duration: "2 months",
      description:
        "Developed a real-time messaging application with features like user presence, message notifications, and message history.",
      color: "indigo",
      icon: <FaCode className="text-indigo-400" size={20} />,
    },
    {
      title: "Task Management System",
      technologies: "React, Node.js, PostgreSQL",
      duration: "1 month",
      description:
        "Created a collaborative task management system with role-based access control, task assignments, and deadline notifications.",
      color: "teal",
      icon: <FaServer className="text-teal-400" size={20} />,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  const getColor = (color) => {
    switch (color) {
      case "blue":
        return "from-blue-500 to-blue-600 border-blue-400 shadow-blue-400/20";
      case "purple":
        return "from-purple-500 to-purple-600 border-purple-400 shadow-purple-400/20";
      case "green":
        return "from-emerald-500 to-emerald-600 border-emerald-400 shadow-emerald-400/20";
      case "red":
        return "from-red-500 to-red-600 border-red-400 shadow-red-400/20";
      case "yellow":
        return "from-yellow-500 to-amber-600 border-yellow-400 shadow-yellow-400/20";
      case "indigo":
        return "from-indigo-500 to-indigo-600 border-indigo-400 shadow-indigo-400/20";
      case "teal":
        return "from-teal-500 to-teal-600 border-teal-400 shadow-teal-400/20";
      default:
        return "from-gray-500 to-gray-600 border-gray-400 shadow-gray-400/20";
    }
  };

  return (
    <section
      id="experience"
      className="bg-gradient-to-b from-gray-900 to-black text-white"
    >
      <div className="container mx-auto px-6 py-5">
        {/* Professional Experience Section */}
        <motion.h2
          className="text-5xl font-bold text-center mb-16 relative"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Professional Experience
          </span>
          <motion.span
            className="absolute bottom-0 left-1/2 w-20 h-1 bg-blue-500 rounded-full"
            initial={{ width: 0, x: "-50%" }}
            whileInView={{ width: 80, x: "-50%" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          ></motion.span>
        </motion.h2>

        <div className="relative mb-24">
          {/* Timeline line */}
          <motion.div
            className="absolute left-6 md:left-1/2 w-1 h-full transform -translate-x-1/2 bg-gradient-to-b from-blue-500 via-purple-500 to-blue-500 rounded-full z-0"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
          />

          {/* Experience items */}
          <motion.div
            className="relative z-10"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                className="mb-12 relative"
                variants={itemVariants}
              >
                <div
                  className={`flex flex-col ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  } items-center`}
                >
                  {/* Timeline dot */}
                  <motion.div
                    className={`absolute left-6 md:left-1/2 w-6 h-6 rounded-full bg-gradient-to-r ${getColor(
                      exp.color
                    )} transform -translate-x-1/2 border-2 border-gray-900 z-20 flex items-center justify-center`}
                    whileHover={{ scale: 1.5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <span className="opacity-0 hover:opacity-100 absolute -top-10 bg-gray-800 px-2 py-1 rounded text-xs whitespace-nowrap">
                      {exp.period}
                    </span>
                  </motion.div>

                  {/* Content card */}
                  <motion.div
                    className={`w-full md:w-5/12 ${
                      index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"
                    }`}
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div
                      className={`p-6 bg-gray-800/60 backdrop-blur-sm rounded-xl shadow-xl border border-gray-700 hover:shadow-2xl transition-all duration-500`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        {exp.icon}
                        <h3
                          className={`text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${getColor(
                            exp.color
                          )}`}
                        >
                          {exp.title}
                        </h3>
                      </div>

                      <div
                        className={`flex flex-wrap items-center gap-3 mt-2 ${
                          index % 2 === 0 ? "md:justify-end" : ""
                        }`}
                      >
                        <div className="flex items-center">
                          <FaSuitcase className="mr-2 text-gray-400" />
                          <span className="text-gray-300">{exp.company}</span>
                        </div>
                        <div className="flex items-center">
                          <FaMapMarkerAlt className="mr-2 text-gray-400" />
                          <span className="text-gray-300">{exp.location}</span>
                        </div>
                      </div>

                      <div className="flex items-center mt-2">
                        <FaCalendarAlt className="mr-2 text-gray-400" />
                        <span className="text-gray-300">{exp.period}</span>
                      </div>

                      <p className="mt-4 text-gray-300">{exp.description}</p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Projects Section */}
        <motion.h2
          className="text-5xl font-bold text-center mb-16 relative"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">
            Notable Projects
          </span>
          <motion.span
            className="absolute bottom-0 left-1/2 w-20 h-1 bg-yellow-500 rounded-full"
            initial={{ width: 0, x: "-50%" }}
            whileInView={{ width: 80, x: "-50%" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          ></motion.span>
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="bg-gray-800/60 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:border-gray-500 transition-all duration-300"
              variants={itemVariants}
              whileHover={{
                y: -10,
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div
                className={`h-2 bg-gradient-to-r ${getColor(project.color)}`}
              ></div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  {project.icon}
                  <h3 className="text-xl font-bold text-white">
                    {project.title}
                  </h3>
                </div>
                <div className="flex items-center mb-3">
                  <FaCode className="mr-2 text-gray-400" />
                  <span className="text-gray-300 text-sm">
                    {project.technologies}
                  </span>
                </div>
                <div className="flex items-center mb-4">
                  <FaCalendarAlt className="mr-2 text-gray-400" />
                  <span className="text-gray-300 text-sm">
                    {project.duration}
                  </span>
                </div>
                <p className="text-gray-400">{project.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
