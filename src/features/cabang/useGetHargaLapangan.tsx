import axiosInstance from "@/lib/axios";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import Cookies from "js-cookie";

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
      const token = Cookies.get("token");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const cabangResponse = await axiosInstance.get(`/add-cart/${id}`, {
        headers,
      });
      return cabangResponse;
    },
    ...options,
  });
};

export default useGetHargaLapangan;
