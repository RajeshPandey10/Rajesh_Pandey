const BASE_URL = 'https://portfolio-backend-xymu.onrender.com/';

export const getImageUrl = (imagePath) => {
  if (!imagePath) return `${BASE_URL}/uploads/default.jpg`; // Fallback for missing images
  return `${BASE_URL}${imagePath}`;
};