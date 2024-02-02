import axiosInstance from "@/lib/axios";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export const useGetCabang = (
  options?: UseQueryOptions<
    AxiosResponse,
    unknown,
    AxiosResponse,
    ["get.cabang"]
  >
) => {
  return useQuery({
    queryKey: ["get.cabang"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const cabangResponse = await axiosInstance.get("/cabang", { headers });
      return cabangResponse;
    },
    ...options,
  });
};

export default useGetCabang;
