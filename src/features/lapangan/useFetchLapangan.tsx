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
      const cabangResponse = await axiosInstance.get("/cabang");
      return cabangResponse;
    },
    ...options,
  });
};

export default useFetchLapangan;
