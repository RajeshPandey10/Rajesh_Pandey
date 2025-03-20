import React from "react";
import { Fade } from "react-awesome-reveal";

const experiences = [
  {
    title: "Virtual Intern at Codesoft",
    duration: "1 Month",
    description:
      "Worked on building scalable backend systems and APIs for e-commerce platforms.",
  },
  {
    title: "Associate Backend Developer at Covosys",
    duration: "7 Months (Running)",
    description:
      "Developed and maintained backend services using Node.js and Express. Integrated third-party APIs and optimized database queries.",
  },
  {
    title: "MERN Intern at Lunar IT",
    duration: "2 Months (Running)",
    description:
      "Collaborated on full-stack projects using the MERN stack. Focused on creating dynamic user interfaces and RESTful APIs.",
  },
];

const Experience = () => {
  return (
    <div id="experience" className="bg-gray-900 text-white py-28">
      <h2 className="text-4xl font-bold text-center mb-12">My Experience</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-8">
        {experiences.map((exp, index) => (
          <Fade key={index} direction="up" triggerOnce>
            <div className="relative bg-gray-800 p-6 rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-2xl">
              <h3 className="text-2xl font-semibold mb-2">{exp.title}</h3>
              <p className="text-sm text-gray-400 mb-4">{exp.duration}</p>
              <div className="absolute inset-0 bg-gray-900 bg-opacity-90 flex items-center justify-center opacity-0 transition-opacity duration-500 hover:opacity-100">
                <p className="text-sm text-gray-300 px-4">{exp.description}</p>
              </div>
            </div>
          </Fade>
        ))}
      </div>
    </div>
  );
};

export default Experience;
