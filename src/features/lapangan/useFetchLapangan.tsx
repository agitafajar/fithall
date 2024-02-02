import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { axiosInstance } from "@/lib/axios";

export const useFetchLapangan = (
  options?: UseQueryOptions<
    AxiosResponse,
    unknown,
    AxiosResponse,
    ["fetch.products"]
  >
) => {
  return useQuery({
    queryKey: ["fetch.products"],
    queryFn: async () => {
      const productsResponse = await axiosInstance.get("/pokemon/ditto");
      return productsResponse;
    },
    ...options,
  });
};

export default useFetchLapangan;
