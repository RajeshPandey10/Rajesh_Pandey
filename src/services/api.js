import axios from "axios";

const API_BASE_URL = "http://localhost:4000/api";

export const fetchProjects = async (
  page = 1,
  limit = 9,
  category = "all",
  featured = false
) => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  if (category && category !== "all") {
    params.append("category", category);
  }

  if (featured) {
    params.append("featured", "true");
  }

  const response = await axios.get(`${API_BASE_URL}/projects?${params}`);
  return response.data;
};

export const fetchGallery = async (page = 1, limit = 12, category = "all") => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  if (category && category !== "all") {
    params.append("category", category);
  }

  const response = await axios.get(`${API_BASE_URL}/gallery?${params}`);
  return response.data;
};

export const addProject = async (projectData, token) => {
  const formData = new FormData();

  // Handle technologies array/string
  if (projectData.technologies) {
    if (typeof projectData.technologies === "string") {
      formData.append("technologies", projectData.technologies);
    } else if (Array.isArray(projectData.technologies)) {
      formData.append("technologies", projectData.technologies.join(", "));
    }
  }

  // Handle other fields
  for (const key in projectData) {
    if (key !== "technologies") {
      formData.append(key, projectData[key]);
    }
  }

  const response = await axios.post(
    `${API_BASE_URL}/admin/projects`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// Update an existing project
export const updateProject = async (id, project, token) => {
  const formData = new FormData();

  // Handle technologies
  if (project.technologies) {
    if (typeof project.technologies === "string") {
      formData.append("technologies", project.technologies);
    } else if (Array.isArray(project.technologies)) {
      formData.append("technologies", project.technologies.join(", "));
    }
  }

  // Handle other fields
  Object.entries(project).forEach(([key, value]) => {
    if (key !== "technologies" && value !== null && value !== undefined) {
      formData.append(key, value);
    }
  });

  const response = await axios.put(
    `${API_BASE_URL}/admin/projects/${id}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

export const deleteProject = async (id, token) => {
  const response = await axios.delete(`${API_BASE_URL}/admin/projects/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Fetch testimonials (public, for portfolio display)
export const fetchTestimonials = async () => {
  const response = await axios.get(`${API_BASE_URL}/testimonials`);
  return response.data;
};

// Submit contact form
export const submitContact = async (contactData) => {
  const response = await axios.post(`${API_BASE_URL}/contacts`, contactData);
  return response.data;
};

// Gallery Admin API functions
export const fetchAllGalleryItems = async (token) => {
  const response = await axios.get(`${API_BASE_URL}/gallery/admin`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const addGalleryItem = async (galleryData, token) => {
  const formData = new FormData();
  formData.append("title", galleryData.title);
  formData.append("description", galleryData.description);
  formData.append("category", galleryData.category);
  if (galleryData.image) {
    formData.append("image", galleryData.image);
  }

  const response = await axios.post(`${API_BASE_URL}/gallery`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateGalleryItem = async (id, galleryData, token) => {
  const formData = new FormData();
  formData.append("title", galleryData.title);
  formData.append("description", galleryData.description);
  formData.append("category", galleryData.category);
  if (galleryData.image) {
    formData.append("image", galleryData.image);
  }

  const response = await axios.put(`${API_BASE_URL}/gallery/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const deleteGalleryItem = async (id, token) => {
  const response = await axios.delete(`${API_BASE_URL}/gallery/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
