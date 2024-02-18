/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
"use client";
import useGetCabang from "@/features/cabang/useGetCabang";
import FilterCard from "./components/cards/FilterCards";
import JoinMemberCard from "./components/cards/JoinMemberCard";
import KeunggulanFitcallCard from "./components/cards/KeunggulanFitcallCard";
import LapanganCard from "./components/cards/LapanganCard";
import { useState } from "react";
import React from "react";
import LoadingPage from "./loading";
import ErrorPage from "./error";

export default function Home() {
  const { data, isLoading, error } = useGetCabang();
  const [startIndex, setStartIndex] = useState(0);
  const cardsPerPage = 4;
  const cabangData = data?.data || [];

  const dataFilter = [
    {
      id: "1",
      title: "Location",
      desc: "Lokasi lapangan",
      icon: "../assets/png/location.png",
    },
    {
      id: "2",
      title: "Field Type",
      desc: "Tipe lapangan",
      icon: "../assets/png/store.png",
    },
    {
      id: "3",
      title: "Date",
      desc: "Pilih Tanggal",
      icon: "../assets/png/calendar.png",
    },
  ];

  const handleNextClick = () => {
    setStartIndex(startIndex + cardsPerPage);
  };
  const handlePrevClick = () => {
    setStartIndex(Math.max(0, startIndex - cardsPerPage));
  };

  const visibleDataSport = cabangData.slice(
    startIndex,
    startIndex + cardsPerPage
  );
  const isNextDisabled = startIndex + cardsPerPage >= cabangData.length;

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
    <main>
      <div className="w-full flex-col items-center justify-center h-[450px] mb-12 sm:hidden md:hidden lg:hidden xl:hidden">
        <div
          className="relative bg-cover bg-center w-full h-full rounded-3xl items-center p-24 -mb-12"
          style={{ backgroundImage: "url('../assets/png/home-banner.png')" }}
        >
          <div className="w-[30%] relative z-10">
            <p className="font-bold text-5xl md:text-4xl text-white mb-6">
              Pesan Lapangan, Main Tanpa Ribet!
            </p>
            <p className="font-bold text-white">
              Segera Temukan dan Booking di Sini.
            </p>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent rounded-3xl"></div>
        </div>

        <div className="flex justify-between max-w-4xl shadow-md p-6 rounded-lg gap-6 z-10 bg-white">
          {dataFilter.map((listData) => {
            return (
              <div key={listData.id}>
                <FilterCard
                  id={listData.id}
                  desc={listData.desc}
                  icon={listData.icon}
                  title={listData.title}
                />
              </div>
            );
          })}
          <div className="flex gap-2 cursor-pointer mr-4 items-center border-2 border-primary py-2 text-white bg-primary px-12 rounded-md font-semibold text-sm">
            <p>Search</p>
            <img src="../assets/png/search.png" width="18px" alt="cart-icon" />
          </div>
        </div>
      </div>
      <JoinMemberCard />
      <div>
        <div className="flex justify-between items-center mb-4">
          <div className="font-bold flex text-[22px] sm:justify-between md:justify-start w-full lg:justify-start xl:justify-start">
            Cabang Fithall
            <span className="text-primary flex items-center pl-8 text-sm cursor-pointer">
              Lihat Semua
              <img
                src="../assets/png/next.png"
                width="6px"
                className="ml-1 pt-1"
              />
            </span>
          </div>
          <div className="sm:hidden md:flex lg:flex xl:flex gap-4">
            <img
              src="../assets/png/back-icon.png"
              width="40px"
              className="ml-1 pt-1 cursor-pointer"
              onClick={handlePrevClick}
            />
            <img
              src="../assets/png/next-icon.png"
              width="40px"
              className={`ml-1 pt-1 cursor-pointer ${
                isNextDisabled
                  ? "opacity-50 cursor-not-allowed pointer-events-none"
                  : ""
              }`}
              onClick={handleNextClick}
            />
          </div>
        </div>
        <LapanganCard dataList={visibleDataSport} />
      </div>
      <KeunggulanFitcallCard />
    </main>
  );
}
