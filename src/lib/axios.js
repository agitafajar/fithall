"use client";

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://fithall.id/api",
});

const isGuest = localStorage.getItem("is-guest");
const token = localStorage.getItem("token");

{
  isGuest === null
    ? axiosInstance.interceptors.request.use((config) => {
        config.headers.Authorization =
          "Bearer 827361|y2z92CPAgqr5IF6BkbiIC0r7yqeTN40HrGzYJuDr";
        return config;
      })
    : axiosInstance.interceptors.request.use((config) => {
        config.headers.Authorization = `Bearer ${token}`;
        return config;
      });
}

export default axiosInstance;
