import axios from 'axios';

const API_BASE_URL = 'https://portfolio-backend-xymu.onrender.com/api';

export const fetchProjects = async () => {
  const response = await axios.get(`${API_BASE_URL}/projects`);
  return response.data;
};

export const addProject = async (project, token) => {
  const formData = new FormData();
  Object.keys(project).forEach((key) => {
    formData.append(key, project[key]);
  });
  const response = await axios.post(`${API_BASE_URL}/admin/projects`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
// Update an existing project
export const updateProject = async (id, project, token) => {
  const formData = new FormData();
  formData.append("title", project.title);
  formData.append("description", project.description);
  formData.append("demoLink", project.demoLink);
  formData.append("githubLink", project.githubLink);
  if (project.image) {
    formData.append("image", project.image);
  }

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