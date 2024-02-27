"use client";

import useGetCabang from "@/features/cabang/useGetCabang";
import LapanganCard from "../components/cards/LapanganCard";
import ErrorPage from "../error";
import LoadingPage from "../loading";

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
      <LapanganCard dataList={cabangData} />
    </div>
  );
}
