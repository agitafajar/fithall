/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import BannerCard from "@/app/components/cards/BannerCard";
import ListLapanganCard from "@/app/components/cards/ListLapanganCard";
import ErrorPage from "@/app/error";
import LoadingPage from "@/app/loading";
import useGetLapangan from "@/features/cabang/useGetLapangan";
import EmptyStatePage from "@/app/components/cards/EmptyStateCard";

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

  const [activeTab, setActiveTab] = useState("list");

  const handleTabClick = (tab: any) => {
    setActiveTab(tab);
  };

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

      <div className="flex justify-center -mt-12">
        <div className=" -mt-4 flex justify-between max-w-4xl shadow-md p-6 rounded-lg gap-4 z-10 font-bold bg-white">
          <button
            className={`cursor-pointer focus:outline-none ${
              activeTab === "list" ? "font-bold text-[#0C8C6B]" : ""
            }`}
            onClick={() => handleTabClick("list")}
          >
            <div className="flex items-center gap-1 px-12">
              <img
                src="../assets/png/location.png"
                alt=""
                width="20px"
                height="20px"
              />
              <p>List Lapangan</p>
            </div>
          </button>
          <button
            className={`cursor-pointer focus:outline-none ${
              activeTab === "detail" ? "font-bold text-[#0C8C6B]" : ""
            }`}
            onClick={() => handleTabClick("detail")}
          >
            <div className="flex items-center gap-1 border-x-2 px-12">
              <img
                src="../assets/png/store.png"
                alt=""
                width="20px"
                height="20px"
              />
              <p>About Lapangan</p>
            </div>
          </button>
          <button
            className={`cursor-pointer focus:outline-none ${
              activeTab === "gallery" ? "font-bold text-[#0C8C6B]" : ""
            }`}
            onClick={() => handleTabClick("gallery")}
          >
            <div className="flex items-center gap-1 px-12">
              <img
                src="../assets/png/calendar.png"
                alt=""
                width="20px"
                height="20px"
              />
              <p>Galery Lapangan</p>
            </div>
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="my-6 font-bold">
        {activeTab === "list" && "Lapangan Badminton"}
        {activeTab === "detail" && "About Lapangan"}
        {activeTab === "gallery" && "Galeri Lapangan"}
      </div>

      {activeTab === "list" && (
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
      )}

      {activeTab === "detail" && (
        <div>
          <EmptyStatePage />
        </div>
      )}

      {activeTab === "gallery" && (
        <div className="flex gap-6">
          {cabangDataLapangan?.data.galery.map((lapangan: any) => (
            <>
              <img
                src={lapangan.src}
                className="rounded-xl w-[300px] h-[300px]"
              />
            </>
          ))}
        </div>
      )}
    </>
  );
}
