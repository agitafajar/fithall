import axiosInstance from "@/lib/axios";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export const useGetuser = (
  options?: UseQueryOptions<AxiosResponse, unknown, AxiosResponse, ["get.me"]>
) => {
  return useQuery({
    queryKey: ["get.me"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const meResponse = await axiosInstance.get("/me", { headers });
      return meResponse;
    },
    ...options,
  });
};

export default useGetuser;
