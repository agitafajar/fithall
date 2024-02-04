/* eslint-disable jsx-a11y/alt-text */
"use client";
import useGetCabang from "@/features/cabang/useGetCabang";
import FilterCard from "./components/cards/FilterCards";
import JoinMemberCard from "./components/cards/JoinMemberCard";
import KeunggulanFitcallCard from "./components/cards/KeunggulanFitcallCard";
import LapanganCard from "./components/cards/LapanganCard";
import { useEffect, useState } from "react";

/* eslint-disable @next/next/no-img-element */
export default function Home() {
  const { data, error, isError } = useGetCabang();
  const [startIndex, setStartIndex] = useState(0);
  const cardsPerPage = 4;

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

  useEffect(() => {
    if (isError) {
      alert(`Gagal mengambil data !`);
    }
  }, [isError, error]);

  const listCabangLapangan = data ? data.data : null;
  console.log("listCabangLapangan", listCabangLapangan);
  console.log(Array.isArray(listCabangLapangan)); // Seharusnya mencetak `true` jika listCabangLapangan adalah array.

  const handleNextClick = () => {
    setStartIndex(startIndex + cardsPerPage);
  };
  const handlePrevClick = () => {
    setStartIndex(Math.max(0, startIndex - cardsPerPage));
  };

  const visibleDataSport = dataCabang.slice(
    startIndex,
    startIndex + cardsPerPage
  );
  const isNextDisabled = startIndex + cardsPerPage >= dataCabang.length;

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
      <div>
        <div className="flex justify-between items-center mb-4">
          <p className="font-bold flex text-[22px]">
            Sport Training
            <span className="text-primary flex items-center pl-8 text-sm cursor-pointer">
              Lihat Semua
              <img
                src="../assets/png/next.png"
                width="6px"
                className="ml-1 pt-1"
              />
            </span>
          </p>
          <div className="flex gap-4">
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
        <LapanganCard dataSport={visibleDataSport} />
      </div>
      <LapanganCard dataSport={dataSport} />
      <JoinMemberCard />
      <LapanganCard dataSport={dataCabang} />
      <KeunggulanFitcallCard />
    </main>
  );
}
