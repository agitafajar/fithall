import axiosInstance from "@/lib/axios";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export const useGetLapangan = (
  slug: string,
  options?: UseQueryOptions<
    AxiosResponse,
    unknown,
    AxiosResponse,
    ["get.cabangLapangan"]
  >
) => {
  return useQuery({
    queryKey: ["get.cabangLapangan"],
    queryFn: async () => {
      if (typeof localStorage !== "undefined") {
        const token = localStorage.getItem("token");
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const cabangResponse = await axiosInstance.get(`/cabang/${slug}`, {
          headers,
        });
        return cabangResponse;
      } else {
        throw new Error("localStorage is not defined");
      }
    },
    ...options,
  });
};

export default useGetLapangan;
