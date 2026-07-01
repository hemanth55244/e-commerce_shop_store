const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3002";

export const getImageUrl = (imagePath) => {
  if (!imagePath) return "";
  if (imagePath.startsWith("http")) return imagePath;
  // If backend stored an absolute filesystem path containing 'uploads/',
  // extract the uploads part so the static route can serve it.
  const uploadsIndex = imagePath.indexOf("uploads/");
  if (uploadsIndex !== -1) {
    const rel = imagePath.slice(uploadsIndex); // e.g. 'uploads/123.jpg'
    return `${API_URL}/${rel}`;
  }

  if (imagePath.startsWith("/")) {
    return `${API_URL}${imagePath}`;
  }

  return `${API_URL}/${imagePath.replace(/\\/g, "/")}`;
};

const getToken = () => localStorage.getItem("token");

export const apiRequest = async (endpoint, options = {}) => {
  const headers = { ...options.headers };
  const token = getToken();

  if (token) {
    headers.authorization = `Bearer ${token}`;
  }

  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
};

export default API_URL;
