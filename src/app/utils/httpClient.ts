import axios from "axios";
import { localStorageKeys } from "../config/localStorageKeys";

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

httpClient.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem(localStorageKeys.ACCESS_TOKEN.key);

  if (accessToken) {
    config.headers.Authorization = `Bearer ${JSON.parse(accessToken)}`;
  }

  return config;
});
