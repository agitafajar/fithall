import axiosInstance from "@/lib/axios";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export const useGetCart = (
  options?: UseQueryOptions<AxiosResponse, unknown, AxiosResponse, ["get.cart"]>
) => {
  return useQuery({
    queryKey: ["get.cart"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const cabangResponse = await axiosInstance.get(`/get-cart`, {
        headers,
      });
      return cabangResponse;
    },
    ...options,
  });
};

export default useGetCart;
