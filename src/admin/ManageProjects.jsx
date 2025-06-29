import React, { useState, useEffect } from "react";
import {
  fetchProjects,
  addProject,
  deleteProject,
  updateProject,
} from "../services/api";
import { getImageUrl } from "../utils/imageUtils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageProjects = () => {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    category: "web",
    technologies: "",
    demoLink: "",
    githubLink: "",
    featured: false,
  });
  const [image, setImage] = useState(null);
  const [editingProject, setEditingProject] = useState(null); // Track the project being edited

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchProjects();
        // Handle both direct array response and paginated response
        const projectsArray = data?.projects || data?.data || data;
        setProjects(Array.isArray(projectsArray) ? projectsArray : []);
      } catch (error) {
        console.error("Error fetching projects:", error);
        toast.error("Failed to fetch projects.");
        // Ensure projects is always an array even on error
        setProjects([]);
      }
    };
    loadProjects();
  }, []);

  const handleAddOrUpdateProject = async () => {
    try {
      const token = localStorage.getItem("adminToken");

      // Prepare project data
      const projectData = {
        ...newProject,
        technologies: newProject.technologies, // Keep as string, will be parsed in API
        image,
      };

      if (editingProject) {
        // Update existing project
        const data = await updateProject(
          editingProject._id,
          projectData,
          token
        );
        setProjects((prevProjects) =>
          Array.isArray(prevProjects)
            ? prevProjects.map((proj) =>
                proj._id === editingProject._id ? data : proj
              )
            : [data]
        );
        toast.success("Project updated successfully!");
      } else {
        // Add new project
        const data = await addProject(projectData, token);
        setProjects((prevProjects) =>
          Array.isArray(prevProjects) ? [...prevProjects, data] : [data]
        );
        toast.success("Project added successfully!");
      }

      // Reset form
      setNewProject({
        title: "",
        description: "",
        category: "web",
        technologies: "",
        demoLink: "",
        githubLink: "",
        featured: false,
      });
      setImage(null);
      setEditingProject(null);
    } catch (error) {
      console.error("Error adding/updating project:", error);
      toast.error("Failed to add/update project.");
    }
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setNewProject({
      title: project.title,
      description: project.description,
      category: project.category || "web",
      technologies: project.technologies ? project.technologies.join(", ") : "",
      demoLink: project.demoLink,
      githubLink: project.githubLink,
      featured: project.featured || false,
    });
    setImage(null); // Reset image input (optional)
  };

  const handleDeleteProject = async (id) => {
    try {
      const token = localStorage.getItem("adminToken");
      await deleteProject(id, token);
      setProjects((prevProjects) =>
        Array.isArray(prevProjects)
          ? prevProjects.filter((proj) => proj._id !== id)
          : []
      );
      toast.success("Project deleted successfully!");
    } catch (error) {
      console.error("Error deleting project:", error);
      toast.error("Failed to delete project.");
    }
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h3 className="text-3xl font-bold mb-6 text-center">Manage Projects</h3>

      {/* Add/Update Project Form */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
        <h4 className="text-xl font-semibold mb-4">
          {editingProject ? "Edit Project" : "Add New Project"}
        </h4>
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
          <textarea
            placeholder="Description"
            value={newProject.description}
            onChange={(e) =>
              setNewProject({ ...newProject, description: e.target.value })
            }
            className="w-full p-3 border border-gray-700 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none"
          />
          <select
            value={newProject.category}
            onChange={(e) =>
              setNewProject({ ...newProject, category: e.target.value })
            }
            className="w-full p-3 border border-gray-700 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="web">Web Application</option>
            <option value="mobile">Mobile Application</option>
            <option value="design">Design Project</option>
            <option value="ai-ml">AI/ML Project</option>
          </select>
          <input
            type="text"
            placeholder="Technologies (e.g., React, Node.js, MongoDB)"
            value={newProject.technologies}
            onChange={(e) =>
              setNewProject({ ...newProject, technologies: e.target.value })
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
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full p-3 border border-gray-700 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <label className="flex items-center gap-2 text-white">
            <input
              type="checkbox"
              checked={newProject.featured}
              onChange={(e) =>
                setNewProject({ ...newProject, featured: e.target.checked })
              }
              className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
            />
            Featured Project
          </label>
        </div>
        <button
          onClick={handleAddOrUpdateProject}
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded transition duration-300"
        >
          {editingProject ? "Update Project" : "Add Project"}
        </button>
      </div>

      {/* Display Projects */}
      <div>
        <h4 className="text-2xl font-semibold mb-4">All Projects</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects?.map((project) => (
            <div
              key={project._id}
              className="bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
            >
              <img
                src={getImageUrl(project.image)}
                alt={project.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-xl font-bold">{project.title}</h3>
                {project.featured && (
                  <span className="bg-yellow-500 text-black text-xs px-2 py-1 rounded">
                    Featured
                  </span>
                )}
              </div>
              <div className="mb-2">
                <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">
                  {project.category || "web"}
                </span>
              </div>
              {project.technologies && project.technologies.length > 0 && (
                <div className="mb-3">
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="bg-gray-600 text-white text-xs px-2 py-1 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <p className="text-sm text-gray-400 mb-4 line-clamp-3">
                {project.description}
              </p>
              <div className="flex justify-between items-center mb-4">
                {project.demoLink && (
                  <a
                    href={project.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline text-sm"
                  >
                    🔗 Demo
                  </a>
                )}
                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline text-sm"
                  >
                    📁 GitHub
                  </a>
                )}
              </div>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleEditProject(project)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteProject(project._id)}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default ManageProjects;
