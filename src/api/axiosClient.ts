import axios from "axios";

export const apibase = "https://localhost:44312/api";
export const apiRoot = apibase.replace("/api", ""); 
// -> https://localhost:44312

const axiosClient = axios.create({
  baseURL: apibase,
  withCredentials: true,
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default axiosClient;
