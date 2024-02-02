"use client";

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://fithall.id/api",
});

axiosInstance.interceptors.request.use((config) => {
  config.headers.Authorization =
    "Bearer 827361|y2z92CPAgqr5IF6BkbiIC0r7yqeTN40HrGzYJuDr";
  return config;
});

export default axiosInstance;
