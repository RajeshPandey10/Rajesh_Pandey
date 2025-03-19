import React, { useState, useEffect } from "react";
import { fetchProjects, addProject, deleteProject } from "../services/api";
import { getImageUrl } from "../utils/imageUtils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageProjects = () => {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    link: "",
    demoLink: "",
    githubLink: "",
  });
  const [image, setImage] = useState(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchProjects();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
        toast.error("Failed to fetch projects.");
      }
    };
    loadProjects();
  }, []);

  const handleAddProject = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const project = { ...newProject, image };
      const data = await addProject(project, token);
      setProjects([...projects, data]);
      setNewProject({
        title: "",
        description: "",
        link: "",
        demoLink: "",
        githubLink: "",
      });
      setImage(null);
      toast.success("Project added successfully!");
    } catch (error) {
      console.error("Error adding project:", error);
      toast.error("Failed to add project.");
    }
  };

  const handleDeleteProject = async (id) => {
    try {
      const token = localStorage.getItem("adminToken");
      await deleteProject(id, token);
      setProjects(projects.filter((proj) => proj._id !== id));
      toast.success("Project deleted successfully!");
    } catch (error) {
      console.error("Error deleting project:", error);
      toast.error("Failed to delete project.");
    }
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h3 className="text-3xl font-bold mb-6 text-center">Manage Projects</h3>

      {/* Add Project Form */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
        <h4 className="text-xl font-semibold mb-4">Add New Project</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Title"
            value={newProject.title}
            onChange={(e) =>
              setNewProject({ ...newProject, title: e.target.value })
            }
            className="w-full p-3 border border-gray-700 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Description"
            value={newProject.description}
            onChange={(e) =>
              setNewProject({ ...newProject, description: e.target.value })
            }
            className="w-full p-3 border border-gray-700 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Demo Link"
            value={newProject.demoLink}
            onChange={(e) =>
              setNewProject({ ...newProject, demoLink: e.target.value })
            }
            className="w-full p-3 border border-gray-700 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="GitHub Link"
            value={newProject.githubLink}
            onChange={(e) =>
              setNewProject({ ...newProject, githubLink: e.target.value })
            }
            className="w-full p-3 border border-gray-700 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full p-3 border border-gray-700 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={handleAddProject}
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded transition duration-300"
        >
          Add Project
        </button>
      </div>

      {/* Display Projects */}
      <div>
        <h4 className="text-2xl font-semibold mb-4">All Projects</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project._id}
              className="bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
            >
              <img
                src={getImageUrl(project.image)}
                alt={project.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
              <p className="text-sm text-gray-400 mb-4">
                {project.description}
              </p>
              <div className="flex justify-between items-center">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  View Project
                </a>
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  GitHub
                </a>
              </div>
              <button
                onClick={() => handleDeleteProject(project._id)}
                className="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default ManageProjects;
