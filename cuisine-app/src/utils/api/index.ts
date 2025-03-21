import axios from "axios";

const BASE_API_URL = import.meta.env.VITE_BASE_URL;

const useAxiosInstance = (multipart = false) => {
  const instance = axios.create({
    headers: {
      "Content-Type": multipart ? "multipart/form-data" : "application/json",
    },
    baseURL: BASE_API_URL,
    timeout: 60000,
  });

  instance.interceptors.request.use(
    async (config) => {
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      return Promise.reject(error);
    }
  );

  return instance;
};

export default useAxiosInstance;
