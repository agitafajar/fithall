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

      {/* Mobile Tabview */}
      <div className="justify-center mb-6 sm:flex md:hidden lg:hidden xl:hidden border-b-2">
        <div className="grid grid-cols-3 px-0 z-10 -mt-2 font-bold bg-white w-full items-center justify-between">
          <button
            className={`cursor-pointer focus:outline-none ${
              activeTab === "list"
                ? "font-bold text-[#0C8C6B] border-b-2 border-b-primary py-4 "
                : ""
            }`}
            onClick={() => handleTabClick("list")}
          >
            <div className="flex justify-center gap-1 px-2">
              <img
                src="../assets/svg/icon_black_location.svg"
                alt=""
                width="20px"
                height="20px"
              />
              <p>List</p>
            </div>
          </button>
          <button
            className={`cursor-pointer focus:outline-none ${
              activeTab === "detail"
                ? "font-bold text-[#0C8C6B] border-b-2 border-b-primary py-4"
                : ""
            }`}
            onClick={() => handleTabClick("detail")}
          >
            <div className="flex justify-center gap-1 px-2">
              <img
                src="../assets/svg/icon_black_store.svg"
                alt=""
                width="20px"
                height="20px"
              />
              <p>About</p>
            </div>
          </button>
          <button
            className={`cursor-pointer focus:outline-none ${
              activeTab === "gallery"
                ? "font-bold text-[#0C8C6B] border-b-2 border-b-primary py-4"
                : ""
            }`}
            onClick={() => handleTabClick("gallery")}
          >
            <div className="flex justify-center gap-1 px-2">
              <img
                src="../assets/svg/icon_black_calendar.svg"
                alt=""
                width="20px"
                height="20px"
              />
              <p>Galery</p>
            </div>
          </button>
        </div>
      </div>

      {/* Desktop Tabview */}
      <div className="justify-center -mt-12 sm:hidden md:flex lg:flex xl:flex">
        <div className=" -mt-4 flex justify-between max-w-4xl shadow-md p-6 rounded-lg gap-4 z-10 font-bold bg-white">
          <button
            className={`cursor-pointer focus:outline-none ${
              activeTab === "list" ? "font-bold text-[#0C8C6B]" : ""
            }`}
            onClick={() => handleTabClick("list")}
          >
            <div className="flex items-center gap-1 px-12">
              <img
                src="../assets/svg/icon_black_location.svg"
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
                src="../assets/svg/icon_black_store.svg"
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
                src="../assets/svg/icon_black_calendar.svg"
                alt=""
                width="20px"
                height="20px"
              />
              <p>Galery Lapangan</p>
            </div>
          </button>
        </div>
      </div>

      <div className="my-6 font-bold">
        {activeTab === "list" && "Lapangan Badminton"}
        {activeTab === "detail" && "About Lapangan"}
        {activeTab === "gallery" && "Galeri Lapangan"}
      </div>

      {activeTab === "list" && (
        <div className="  justify-between items-center gap-4 sm:flex md:grid lg:grid xl:grid sm:flex-col md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
          {cabangDataLapangan?.data.lapangan.map((lapangan: any) => (
            <ListLapanganCard
              key={lapangan.id}
              id={lapangan.id}
              imageSrc={lapangan.cover_image}
              name={lapangan.full_name}
              size={lapangan.ukuran}
              slug={lapangan.slug}
              cabang_id={lapangan.cabang_id}
            />
          ))}
        </div>
      )}

      {activeTab === "detail" && (
        <div>
          <EmptyStatePage
            imageUrl="../assets/svg/img_under-maintenance.svg"
            title="This page is under development"
            text="This page is under development"
            linkTo="/"
            linkText="Back to Home"
          />
        </div>
      )}

      {activeTab === "gallery" && (
        <div className="flex sm:flex-col md:flex-row lg:flex-row xl:flex-row items-center sm:justify-center md:justify-start lg:justify-start xl:justify-start gap-6">
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
