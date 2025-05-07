import axios from 'axios';

const API_BASE_URL = 'https://portfolio-backend-xymu.onrender.com/api';

export const fetchProjects = async () => {
  const response = await axios.get(`${API_BASE_URL}/projects`);
  return response.data;
};

export const addProject = async (projectData) => {
  const formData = new FormData();
  for (const key in projectData) {
    formData.append(key, projectData[key]);
  }

  const response = await axios.post(`${API_BASE_URL}/projects`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

// Update an existing project
export const updateProject = async (id, project, token) => {
  const formData = new FormData();
  Object.entries(project).forEach(([key, value]) => {
    if (value) formData.append(key, value); // Append only non-empty fields
  });

  const response = await axios.put(`${API_BASE_URL}/admin/projects/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const deleteProject = async (id, token) => {
  const response = await axios.delete(`${API_BASE_URL}/admin/projects/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const createAdmin = async (username, password) => {
  const response = await axios.post(`${API_BASE_URL}/admin/create`, { username, password });
  return response.data;
};

export const loginAdmin = async (username, password) => {
  const response = await axios.post(`${API_BASE_URL}/admin/login`, { username, password });
  return response.data;
};

// Fetch all contact messages
export const fetchContacts = async (token) => {
  const response = await axios.get(`${API_BASE_URL}/contacts`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Send a reply to a contact
export const replyToContact = async (email, response, token) => {
  try {
    const res = await axios.post(
      `${API_BASE_URL}/contacts/reply`,
      { email, response },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data;
  } catch (error) {
    console.error('Error sending reply:', error);
    throw error;
  }
};
export const deleteContact = async (id, token) => {
  await axios.delete(`${API_BASE_URL}/contacts/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });};

// Submit the contact form
export const submitContactForm = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/contacts`, formData);
    return response.data; // Return the response data
  } catch (error) {
    console.error("Error submitting contact form:", error);
    throw error; // Throw the error to handle it in the frontend
  }
};

// Testimonial API endpoints - Ensure we're calling the right endpoint that returns only approved testimonials
export const fetchTestimonials = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/testimonials`);
    // The server should already filter for approved testimonials, but let's add a safeguard
    return response.data.filter(testimonial => testimonial.status === 'approved');
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return [];
  }
};

export const fetchAllTestimonials = async (adminToken) => {
  const response = await axios.get(`${API_BASE_URL}/testimonials/all`, {
    headers: { Authorization: `Bearer ${adminToken}` },
  });
  return response.data;
};

export const submitTestimonial = async (testimonialData) => {
  const formData = new FormData();
  for (const key in testimonialData) {
    formData.append(key, testimonialData[key]);
  }

  const response = await axios.post(`${API_BASE_URL}/testimonials`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const updateTestimonialStatus = async (id, status, adminToken) => {
  const response = await axios.put(
    `${API_BASE_URL}/testimonials/${id}/status`,
    { status },
    {
      headers: { Authorization: `Bearer ${adminToken}` },
    }
  );
  return response.data;
};

export const updateTestimonial = async (id, data, adminToken) => {
  const formData = new FormData();
  for (const key in data) {
    if (data[key] !== undefined) {
      formData.append(key, data[key]);
    }
  }

  const response = await axios.put(`${API_BASE_URL}/testimonials/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${adminToken}`,
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const deleteTestimonial = async (id, adminToken) => {
  const response = await axios.delete(`${API_BASE_URL}/testimonials/${id}`, {
    headers: { Authorization: `Bearer ${adminToken}` },
  });
  return response.data;
};