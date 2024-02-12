import axiosInstance from "@/lib/axios";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import Cookies from "js-cookie";

export const useGetTimeslot = (
  lapangan_id: string,
  hari?: [] | string[],
  options?: UseQueryOptions<
    AxiosResponse,
    unknown,
    AxiosResponse,
    ["get.timeslot"]
  >
) => {
  return useQuery({
    queryKey: ["get.timeslot"],
    queryFn: async () => {
      const token = Cookies.get("token");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const cabangResponse = await axiosInstance.get(
        `/timeslot/list?lapangan_id=${lapangan_id}&hari[]=${hari?.join(
          "&hari[]="
        )}`,
        {
          headers,
        }
      );
      return cabangResponse;
    },
    ...options,
  });
};

export default useGetTimeslot;
