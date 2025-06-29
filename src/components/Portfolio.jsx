import React, { useState, useEffect } from "react";
import {
  ExternalLink,
  Github,
  Folder,
  Grid3X3,
  List,
  Calendar,
  Code2,
  Eye,
  X,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { fetchProjects } from "../services/api";
import { getImageUrl } from "../utils/imageUtils";

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);

  const loadProjects = async (page = 1, category = "all", reset = false) => {
    try {
      if (reset) {
        setIsLoading(true);
      } else {
        setLoadingMore(true);
      }

      const data = await fetchProjects(page, 9, category);

      if (reset || page === 1) {
        setProjects(data.projects);
      } else {
        setProjects((prev) => [...prev, ...data.projects]);
      }

      setPagination(data.pagination);
      setCurrentPage(page);
    } catch (error) {
      console.error("Error loading projects:", error);
      // Ensure projects is always an array, even on error
      if (reset || page === 1) {
        setProjects([]);
      }
      setPagination(null);
    } finally {
      setIsLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    loadProjects(1, filter, true);
  }, [filter]);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setCurrentPage(1);
  };

  const loadMoreProjects = () => {
    if (pagination && pagination.hasNext) {
      loadProjects(currentPage + 1, filter, false);
    }
  };

  const categories = [
    { id: "all", name: "All Projects", icon: <Grid3X3 className="w-4 h-4" /> },
    { id: "web", name: "Web Apps", icon: <Code2 className="w-4 h-4" /> },
    { id: "mobile", name: "Mobile Apps", icon: <Folder className="w-4 h-4" /> },
    { id: "design", name: "Design", icon: <Eye className="w-4 h-4" /> },
    { id: "ai-ml", name: "AI/ML", icon: <Code2 className="w-4 h-4" /> },
  ];

  return (
    <section
      id="portfolio"
      className="py-10 bg-gradient-to-br from-slate-50 to-blue-50"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full text-blue-700 text-sm font-medium mb-6">
            <Folder className="w-4 h-4" />
            Portfolio
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Featured Work
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            A collection of projects showcasing modern web development,
            innovative solutions, and creative problem-solving.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col xl:flex-row items-center justify-between mb-12 gap-6">
          <div className="flex flex-wrap justify-center items-center gap-2 p-1 bg-white rounded-xl border border-slate-200 shadow-sm w-full xl:w-auto">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleFilterChange(category.id)}
                className={`px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-medium transition-all duration-200 ${
                  filter === category.id
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-1 md:gap-2">
                  {category.icon}
                  <span className="hidden sm:inline">{category.name}</span>
                  <span className="sm:hidden">
                    {category.name.split(" ")[0]}
                  </span>
                </div>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 p-1 bg-white rounded-xl border border-slate-200 shadow-sm">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition-all duration-200 ${
                viewMode === "grid"
                  ? "bg-blue-600 text-white"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
              title="Grid View"
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg transition-all duration-200 ${
                viewMode === "list"
                  ? "bg-blue-600 text-white"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Projects Count */}
        <div className="text-center mb-8">
          <p className="text-slate-600 text-sm md:text-base">
            {pagination ? (
              <>
                Showing{" "}
                <span className="font-semibold text-blue-600">
                  {projects?.length || 0}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-blue-600">
                  {pagination.totalItems}
                </span>{" "}
                projects
              </>
            ) : (
              <>
                Showing{" "}
                <span className="font-semibold text-blue-600">
                  {projects?.length || 0}
                </span>{" "}
                projects
              </>
            )}
          </p>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-64">
            <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-slate-600">Loading projects...</p>
          </div>
        ) : (
          <div
            className={`grid gap-4 md:gap-6 ${
              viewMode === "grid"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1"
            }`}
          >
            {projects?.map((project) => (
              <div
                key={project._id}
                onClick={() => setSelectedProject(project)}
                className={`group cursor-pointer bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 ${
                  viewMode === "list"
                    ? "flex flex-col sm:flex-row items-start"
                    : ""
                }`}
              >
                <div
                  className={`relative overflow-hidden ${
                    viewMode === "list"
                      ? "w-full sm:w-64 h-48 sm:h-40 flex-shrink-0"
                      : "h-48"
                  }`}
                >
                  <img
                    src={getImageUrl(project.image)}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="p-4 md:p-6 flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full" />
                    <span className="text-blue-600 text-xs md:text-sm font-medium">
                      {project.featured ? "Featured Project" : "Project"}
                    </span>
                    {project.category && (
                      <span className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded-full">
                        {project.category.replace("-", "/").toUpperCase()}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg md:text-xl font-bold mb-3 text-slate-900 group-hover:text-blue-600 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.technologies.slice(0, 3).map((tech, index) => (
                        <span
                          key={index}
                          className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="text-slate-500 text-xs">
                          +{project.technologies.length - 3} more
                        </span>
                      )}
                    </div>
                  )}

                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>2024</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      <span>View Details</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Load More Button */}
        {pagination && pagination.hasNext && (
          <div className="text-center mt-12">
            <button
              onClick={loadMoreProjects}
              disabled={loadingMore}
              className="inline-flex items-center gap-2 px-6 md:px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 text-sm md:text-base"
            >
              {loadingMore ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  <ChevronRight className="w-4 h-4" />
                  Load More Projects
                </>
              )}
            </button>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && (!projects || projects.length === 0) && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🚀</div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">
              No Projects Found
            </h3>
            <p className="text-slate-600">
              Try selecting a different category or check back later!
            </p>
          </div>
        )}
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 md:top-6 right-4 md:right-6 z-10 p-2 bg-white rounded-full text-slate-600 hover:bg-slate-50 transition-colors border border-slate-200"
              onClick={() => setSelectedProject(null)}
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative h-64 md:h-80 overflow-hidden">
              <img
                src={getImageUrl(selectedProject.image)}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent" />
            </div>

            <div className="p-4 md:p-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4">
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900">
                  {selectedProject.title}
                </h3>
                {selectedProject.featured && (
                  <span className="bg-yellow-100 text-yellow-800 text-sm px-3 py-1 rounded-full">
                    ⭐ Featured
                  </span>
                )}
              </div>

              {selectedProject.category && (
                <div className="mb-4">
                  <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                    {selectedProject.category.replace("-", "/").toUpperCase()}
                  </span>
                </div>
              )}

              <p className="text-slate-600 mb-6 leading-relaxed text-base md:text-lg">
                {selectedProject.description}
              </p>

              {/* Technologies */}
              {selectedProject.technologies &&
                selectedProject.technologies.length > 0 && (
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold text-slate-900 mb-3">
                      Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="bg-slate-100 text-slate-700 px-3 py-1 rounded-lg text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

              <div className="flex flex-col sm:flex-row flex-wrap gap-4">
                {selectedProject.demoLink && (
                  <a
                    href={selectedProject.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
                )}
                {selectedProject.githubLink && (
                  <a
                    href={selectedProject.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    Source Code
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio;
