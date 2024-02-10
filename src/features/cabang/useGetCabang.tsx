import axiosInstance from "@/lib/axios";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import Cookies from "js-cookie";

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
      const token = Cookies.get("token");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const cabangResponse = await axiosInstance.get("/cabang", { headers });
      return cabangResponse;
    },
    ...options,
  });
};

export default useGetCabang;
