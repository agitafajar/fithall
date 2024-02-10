import axiosInstance from "@/lib/axios";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import Cookies from "js-cookie";

export const useGetListHarga = (
  lapanganId: number,
  tanggalAwal: string,
  options?: UseQueryOptions<
    AxiosResponse,
    unknown,
    AxiosResponse,
    ["get.listHargaLapangan", typeof lapanganId, typeof tanggalAwal]
  >
) => {
  return useQuery({
    queryKey: ["get.listHargaLapangan", lapanganId, tanggalAwal],
    queryFn: async () => {
      const token = Cookies.get("token");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const detailCabangResponse = await axiosInstance.get(
        `/list-harga?lapangan_id=${lapanganId}&tanggal_awal=${tanggalAwal}`,
        {
          headers,
        }
      );
      return detailCabangResponse;
    },
    ...options,
  });
};

export default useGetListHarga;
