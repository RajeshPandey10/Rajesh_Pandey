import React, { useState, useEffect } from "react";
import { fetchProjects } from "../services/api";
import { getImageUrl } from "../utils/imageUtils";
import { Fade } from 'react-awesome-reveal';

const Portfolio = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const loadProjects = async () => {
      const data = await fetchProjects();
      setProjects(data);
    };
    loadProjects();
  }, []);

  return (
    <div id="portfolio" className="portfolio-section bg-gray-900 text-white py-28">
      <h2 className="text-4xl font-bold text-center mb-12">My Projects</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-8">
        {projects.map((project) => (
          <Fade key={project._id} direction="up" triggerOnce>
            <div
              className="bg-gray-800 p-4 rounded-lg shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl"
            >
              <img
                src={getImageUrl(project.image)}
                alt={project.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
              <p className="text-sm text-gray-400 mb-4">{project.description}</p>
              <div className="flex justify-between">
                {project.demoLink && (
                  <a
                    href={project.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition duration-300"
                  >
                    Live Demo
                  </a>
                )}
                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition duration-300"
                  >
                    GitHub
                  </a>
                )}
              </div>
            </div>
          </Fade>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;