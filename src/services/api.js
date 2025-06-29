import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api";

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

  // Handle multiple images
  if (galleryData.images && galleryData.images.length > 0) {
    galleryData.images.forEach((image) => {
      formData.append("images", image);
    });
  }
  // Fallback for single image (backward compatibility)
  else if (galleryData.image) {
    formData.append("images", galleryData.image);
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

  // Handle multiple images
  if (galleryData.images && galleryData.images.length > 0) {
    galleryData.images.forEach((image) => {
      formData.append("images", image);
    });
  }
  // Fallback for single image (backward compatibility)
  else if (galleryData.image) {
    formData.append("images", galleryData.image);
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

// Testimonial Admin API functions
export const fetchAllTestimonials = async (token) => {
  const response = await axios.get(`${API_BASE_URL}/testimonials/admin`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const submitTestimonial = async (testimonialData, token) => {
  const formData = new FormData();
  formData.append("name", testimonialData.name);
  formData.append("email", testimonialData.email || "");
  formData.append("message", testimonialData.message || testimonialData.review);
  formData.append(
    "role",
    testimonialData.role || testimonialData.position || ""
  );
  formData.append("rating", testimonialData.rating);
  if (testimonialData.photo) {
    formData.append("photo", testimonialData.photo);
  }

  const response = await axios.post(`${API_BASE_URL}/testimonials`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateTestimonial = async (id, testimonialData, token) => {
  const formData = new FormData();
  formData.append("name", testimonialData.name);
  formData.append("email", testimonialData.email || "");
  formData.append("message", testimonialData.message || testimonialData.review);
  formData.append(
    "role",
    testimonialData.role || testimonialData.position || ""
  );
  formData.append("rating", testimonialData.rating);
  formData.append("status", testimonialData.status || "pending");
  if (testimonialData.photo) {
    formData.append("photo", testimonialData.photo);
  }

  const response = await axios.put(
    `${API_BASE_URL}/testimonials/${id}`,
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

export const updateTestimonialStatus = async (id, status, token) => {
  const response = await axios.put(
    `${API_BASE_URL}/testimonials/${id}/status`,
    { status },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

export const deleteTestimonial = async (id, token) => {
  const response = await axios.delete(`${API_BASE_URL}/testimonials/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Contacts Admin API functions
export const fetchContacts = async (token) => {
  const response = await axios.get(`${API_BASE_URL}/contacts`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const markContactAsReplied = async (id, token) => {
  const response = await axios.patch(
    `${API_BASE_URL}/contacts/${id}/replied`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

export const replyToContact = async (id, replyMessage, token) => {
  const response = await axios.post(
    `${API_BASE_URL}/contacts/${id}/reply`,
    { replyMessage },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

export const deleteContact = async (id, token) => {
  const response = await axios.delete(`${API_BASE_URL}/contacts/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Admin login API functions
export const loginAdmin = async (email, password) => {
  const response = await axios.post(`${API_BASE_URL}/admin/login`, {
    email,
    password,
  });
  return response.data;
};

export const verifyAdminOTP = async (email, otp) => {
  const response = await axios.post(`${API_BASE_URL}/admin/verify-otp`, {
    email,
    otp,
  });
  return response.data;
};
