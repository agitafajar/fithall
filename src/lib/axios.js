"use client";

import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://fithall.id/api",
});
