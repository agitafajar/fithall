import axiosInstance from "@/lib/axios";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import Cookies from "js-cookie";

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
      const token = Cookies.get("token");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const cabangResponse = await axiosInstance.get(`/cabang/${slug}`, {
        headers,
      });
      return cabangResponse;
    },
    ...options,
  });
};

export default useGetLapangan;
