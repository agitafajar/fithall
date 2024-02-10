import axiosInstance from "@/lib/axios";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import Cookies from "js-cookie";

export const useGetProfiles = (
  options?: UseQueryOptions<
    AxiosResponse,
    unknown,
    AxiosResponse,
    ["get.profiles"]
  >
) => {
  return useQuery({
    queryKey: ["get.profiles"],
    queryFn: async () => {
      const token = Cookies.get("token");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const profilesResponse = await axiosInstance.get("/get-profiles", {
        headers,
      });
      return profilesResponse;
    },
    ...options,
  });
};

export default useGetProfiles;
