const BASE_URL ='https://portfolio-backend-xymu.onrender.com/' ;//'https://portfolio-backend-xymu.onrender.com/'

export const getImageUrl = (imagePath) => {
  if (!imagePath) return '';
  return imagePath; // Cloudinary URLs are already absolute, no need to prepend BASE_URL
};