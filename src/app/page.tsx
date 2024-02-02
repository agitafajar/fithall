/* eslint-disable jsx-a11y/alt-text */
"use client";
import FilterCard from "./components/cards/FilterCards";
import JoinMemberCard from "./components/cards/JoinMemberCard";
import KeunggulanFitcallCard from "./components/cards/KeunggulanFitcallCard";
import LapanganCard from "./components/cards/LapanganCard";
import { useEffect, useState } from "react";
import { useFetchLapangan } from "@/features/lapangan/index";

/* eslint-disable @next/next/no-img-element */
export default function Home() {
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

  const dataCabang = [
    {
      id: "1",
      pic: "../assets/png/contoh-cabang.png",
      label: "Mampang",
      location: "Pancoran, Jakarta Selatan",
      price: "Rp. 35.000",
      time: "06:00 - 23:59",
    },
    {
      id: "1",
      pic: "../assets/png/contoh-cabang.png",
      label: "Kalibata",
      location: "Pancoran, Jakarta Selatan",
      price: "Rp. 35.000",
      time: "06:00 - 23:59",
    },
    {
      id: "1",
      pic: "../assets/png/contoh-cabang.png",
      label: "Pancoran",
      location: "Pancoran, Jakarta Selatan",
      price: "Rp. 35.000",
      time: "06:00 - 23:59",
    },
    {
      id: "1",
      pic: "../assets/png/contoh-cabang.png",
      location: "Gandaria",
      label: "Pancoran, Jakarta Selatan",
      price: "Rp. 35.000",
      time: "06:00 - 23:59",
    },
  ];

  const dataSport = [
    {
      id: "1",
      pic: "../assets/png/contoh-sport.png",
      label: "Mampang",
      location: "Pancoran, Jakarta Selatan",
      price: "Rp. 35.000",
      time: "06:00 - 23:59",
    },
    {
      id: "1",
      pic: "../assets/png/contoh-sport.png",
      label: "Kalibata",
      location: "Pancoran, Jakarta Selatan",
      price: "Rp. 35.000",
      time: "06:00 - 23:59",
    },
    {
      id: "1",
      pic: "../assets/png/contoh-sport.png",
      label: "Pancoran",
      location: "Pancoran, Jakarta Selatan",
      price: "Rp. 35.000",
      time: "06:00 - 23:59",
    },
    {
      id: "1",
      pic: "../assets/png/contoh-sport.png",
      location: "Gandaria",
      label: "Pancoran, Jakarta Selatan",
      price: "Rp. 35.000",
      time: "06:00 - 23:59",
    },
  ];

  const { data, error, isError, isLoading } = useFetchLapangan();

  useEffect(() => {
    if (isError) {
      alert(`Gagal mengambil data !`);
    }
  }, [isError, error]);
  const postsData = data ? data.data : null;

  return (
    <main>
      <div className="w-full flex flex-col items-center justify-center h-[450px] mb-12">
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
          {dataFilter.map((listData, key) => {
            return (
              <>
                <div key={key}>
                  <FilterCard
                    key={listData.id}
                    desc={listData.desc}
                    icon={listData.icon}
                    title={listData.title}
                  />
                </div>
              </>
            );
          })}
          <div className="flex gap-2 cursor-pointer mr-4 items-center border-2 border-primary py-2 text-white bg-primary px-12 rounded-md font-semibold text-sm">
            <p>Search</p>
            <img src="../assets/png/search.png" width="18px" alt="cart-icon" />
          </div>
        </div>
      </div>
      <LapanganCard dataSport={dataCabang} />
      <LapanganCard dataSport={dataSport} />
      <JoinMemberCard />
      <LapanganCard dataSport={dataCabang} />
      <KeunggulanFitcallCard />
    </main>
  );
}
