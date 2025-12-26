import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKENT_URL,
  withCredentials: true,
});

let unauthorizedCallback = () => {
  console.log("unauthorized request, no handler configured");
};

export const setUnauthorizedCallback = (callback) => {
  unauthorizedCallback = callback;
};

api.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // call refresh-token API
        await api.post("/auth/refresh"); 
        return api(originalRequest);
      } catch (refreshError) {
        unauthorizedCallback();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export { api };
