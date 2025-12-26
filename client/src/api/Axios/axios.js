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
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest =
      error.config &
      {
        _retry,
      };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await api.post("");
        return api(originalRequest);
      } catch (error) {
        unauthorizedCallback();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export { api };
