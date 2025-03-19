const BASE_URL = 'http://localhost:3000/';

export const getImageUrl = (imagePath) => {
  if (!imagePath) return `${BASE_URL}/uploads/default.jpg`; // Fallback for missing images
  return `${BASE_URL}${imagePath}`;
};