import axiosInstance from "@/lib/axios";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import Cookies from "js-cookie";

export const useGetRemoveCart = (
  id: string,
  options?: UseQueryOptions<
    AxiosResponse,
    unknown,
    AxiosResponse,
    ["get.removecart"]
  >
) => {
  return useQuery({
    queryKey: ["get.removecart"],
    queryFn: async () => {
      const token = Cookies.get("token");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const cabangResponse = await axiosInstance.get(`/remove-cart/${id}`, {
        headers,
      });
      return cabangResponse;
    },
    ...options,
  });
};

export default useGetRemoveCart;
