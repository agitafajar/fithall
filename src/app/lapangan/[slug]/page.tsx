/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";

import BannerCard from "@/app/components/cards/BannerCard";
import ListLapanganCard from "@/app/components/cards/ListLapanganCard";
import ErrorPage from "@/app/error";
import LoadingPage from "@/app/loading";
import useGetLapangan from "@/features/cabang/useGetLapangan";

export default function ListLapanganPage({
  params,
}: {
  params: { slug: string };
}) {
  const {
    data: cabangDataLapangan,
    isLoading,
    isError,
  } = useGetLapangan(params.slug);
  const title = params.slug;
  const icon = "../assets/png/fithall-circle.png";

  if (isLoading) {
    return (
      <div>
        <LoadingPage />
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <ErrorPage />
      </div>
    );
  }

  return (
    <>
      <BannerCard icon={icon} title={title} />
      <p className="my-6 font-bold">Lapangan Badminton</p>
      <div className="grid grid-cols-4 justify-between items-center gap-4">
        {cabangDataLapangan?.data.lapangan.map((lapangan: any) => (
          <ListLapanganCard
            key={lapangan.id}
            id={lapangan.cabang_id}
            imageSrc={lapangan.cover_image}
            name={lapangan.full_name}
            size={lapangan.ukuran}
          />
        ))}
      </div>
    </>
  );
}
