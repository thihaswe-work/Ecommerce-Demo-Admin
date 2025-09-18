import axios from "axios";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // e.g. http://localhost:5000
  withCredentials: true, // send cookies if using HttpOnly cookie auth
});

// optionally add interceptors for auth
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // clear user state if needed
      localStorage.removeItem("user");

      // redirect to login
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

apiClient.interceptors.request.use((config) => {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];

  if (token) {
    // merge with existing headers safely
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    } as any; // <-- cast to any to satisfy TS
  }

  return config;
});
