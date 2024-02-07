import axiosInstance from "@/lib/axios";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export const useGetHargaLapangan = (
  id: string,
  options?: UseQueryOptions<
    AxiosResponse,
    unknown,
    AxiosResponse,
    ["get.hargaLapangan"]
  >
) => {
  return useQuery({
    queryKey: ["get.hargaLapangan"],
    queryFn: async () => {
      if (typeof localStorage !== "undefined") {
        const token = localStorage.getItem("token");
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const cabangResponse = await axiosInstance.get(`/add-cart/${id}`, {
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

export default useGetHargaLapangan;
