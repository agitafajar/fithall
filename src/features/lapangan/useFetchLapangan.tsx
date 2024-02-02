import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { axiosInstance } from "@/lib/axios";

export const useFetchLapangan = (
  options?: UseQueryOptions<
    AxiosResponse,
    unknown,
    AxiosResponse,
    ["fetch.cabang"]
  >
) => {
  return useQuery({
    queryKey: ["fetch.cabang"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const cabangResponse = await axiosInstance.get("/cabang", { headers });
      return cabangResponse;
    },
    ...options,
  });
};

export default useFetchLapangan;
