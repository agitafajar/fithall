"use client";

import useGetCabang from "@/features/cabang/useGetCabang";
import LapanganCard from "../components/cards/LapanganCard";
import ErrorPage from "../error";
import LoadingPage from "../loading";
import CabangLapanganCard from "../components/cards/CabangLapanganCard";

export default function LapanganPage() {
  const { data, isLoading, error } = useGetCabang();
  const cabangData = data?.data || [];

  if (isLoading) {
    return (
      <div>
        <LoadingPage />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <ErrorPage />
      </div>
    );
  }
  return (
    <div>
      <div>
        <div className="flex gap-6 mb-12 sm:flex-col md:flex-row lg:flex-row xl:flex-row sm:items-center md:items-start lg:items-start xl:items-start">
          {cabangData.map((dataList: any, key: any) => (
            <div key={key}>
              <CabangLapanganCard
                pic={dataList.cover_image}
                label={dataList.nama}
                location={dataList.alamat}
                price={dataList.price}
                openTime={dataList.waktu_buka.substring(0, 5)}
                closeTime={dataList.waktu_tutup.substring(0, 5)}
                slug={dataList.slug}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
