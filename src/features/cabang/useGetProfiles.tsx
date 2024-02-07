import axiosInstance from "@/lib/axios";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

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
      if (typeof localStorage !== "undefined") {
        const token = localStorage.getItem("token");
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const profilesResponse = await axiosInstance.get("/get-profiles", {
          headers,
        });
        return profilesResponse;
      } else {
        throw new Error("localStorage is not defined");
      }
    },
    ...options,
  });
};

export default useGetProfiles;
