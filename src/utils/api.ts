import axios from "axios";
import Cookies from "js-cookie";

export const RAW_API = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_BACKEND_URL,
  // withCredentials: true,
});

export const API = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_BACKEND_API_URL,
  // withCredentials: true,
});

API.interceptors.request.use((config) => {
  const cookie = Cookies.get("Authorization");

  // const finalToken = import.meta.env.VITE_PUBLIC_SAMPLE_TOKEN;
  const finalToken = cookie;

  if (finalToken) {
    config.headers["Authorization"] = `authorization ${finalToken}`;
  }
  return config;
});

export const setCookie = (name: string, value: string, days: number) => {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/;secure`;
};