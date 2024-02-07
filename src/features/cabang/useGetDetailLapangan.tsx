import axiosInstance from "@/lib/axios";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export const useGetDetailLapangan = (
  slug: string,
  options?: UseQueryOptions<
    AxiosResponse,
    unknown,
    AxiosResponse,
    ["get.cabangDetailLapangan", typeof slug]
  >
) => {
  return useQuery({
    queryKey: ["get.cabangDetailLapangan", slug],
    queryFn: async () => {
      if (typeof localStorage !== "undefined") {
        const token = localStorage.getItem("token");
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const detailCabangResponse = await axiosInstance.get(
          `/lapangan/${slug}`,
          {
            headers,
          }
        );
        return detailCabangResponse;
      } else {
        throw new Error("localStorage is not defined");
      }
    },
    ...options,
  });
};

export default useGetDetailLapangan;
