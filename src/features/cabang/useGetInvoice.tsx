"use client";

import axiosInstance from "@/lib/axios";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export const useGetInvoice = (
  slug: string,
  options?: UseQueryOptions<
    AxiosResponse,
    unknown,
    AxiosResponse,
    ["get.invoice", typeof slug]
  >
) => {
  return useQuery({
    queryKey: ["get.invoice", slug],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const detailCabangResponse = await axiosInstance.get(`/invoice/${slug}`, {
        headers,
      });
      return detailCabangResponse;
    },
    ...options,
  });
};

export default useGetInvoice;
