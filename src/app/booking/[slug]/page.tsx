"use client";

import React, { useState, useEffect } from "react";
import BannerCard from "@/app/components/cards/BannerCard";
import ErrorPage from "@/app/error";
import LoadingPage from "@/app/loading";
import useGetDetailLapangan from "@/features/cabang/useGetDetailLapangan";
import useGetListHarga from "@/features/cabang/useGetListHarga";

export default function ListBookingPage({
  params,
}: {
  params: { slug: string };
}) {
  const [selectedBookings, setSelectedBookings] = useState<string[]>([]);
  const handleBookingSelect = (bookingId: string) => {
    setSelectedBookings((prevSelected) =>
      prevSelected?.includes(bookingId)
        ? prevSelected.filter((id: any) => id !== bookingId)
        : [...prevSelected, bookingId]
    );
  };
  console.log("selectedBookings", selectedBookings);
  const {
    data: cabangDataLapangan,
    isLoading: lapanganLoading,
    isError: lapanganError,
  } = useGetDetailLapangan(params.slug);

  // Set default date to today
  const [selectedDate, setSelectedDate] = useState(() => {
    const currentDate = new Date();
    return currentDate.toISOString().split("T")[0];
  });

  const {
    data: listHarga,
    isLoading: hargaLoading,
    isError: hargaError,
    refetch: refetchListHarga,
  } = useGetListHarga(cabangDataLapangan?.data?.id, selectedDate);

  const title = params.slug;
  const icon = "../assets/png/fithall-circle.png";

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
    // Trigger a reload by calling the refetch function
    refetchListHarga();
  };

  if (lapanganLoading || hargaLoading) {
    return <LoadingPage />;
  }

  if (lapanganError || hargaError) {
    return <ErrorPage />;
  }

  const groupedBookings: { [date: string]: any[] } = {};
  listHarga?.data.forEach((listDataHarga: any) => {
    const date = listDataHarga.tanggal;

    if (!groupedBookings[date]) {
      groupedBookings[date] = [listDataHarga];
    } else {
      groupedBookings[date].push(listDataHarga);
    }
  });

  return (
    <>
      <BannerCard icon={icon} title={title} />

      {/* Date Filter */}
      <div className="my-4">
        <label htmlFor="dateFilter" className="mr-2">
          Filter by Date:
        </label>
        <input
          type="date"
          id="dateFilter"
          value={selectedDate}
          onChange={handleDateChange}
        />
      </div>

      <div className="flex gap-4 font-bold text-center justify-between">
        {Object.keys(groupedBookings).map((date) => (
          <div key={date}>
            <p className="mb-2 bg-red-400 ">{date}</p>
            {groupedBookings[date].map((booking) => (
              <div
                key={booking.id}
                className={`py-2 px-6 rounded-xl border-2 mb-8 ${
                  booking.status === "BOOKED"
                    ? "bg-[#F99C9C]"
                    : booking.status === "AVAILABLE"
                    ? selectedBookings.includes(booking.id)
                      ? "bg-[#0C8C6B] cursor-pointer text-white"
                      : "bg-white cursor-pointer"
                    : booking.status === "WAITINGLIST"
                    ? "bg-[#F3DB90]"
                    : ""
                }`}
                onClick={() => handleBookingSelect(booking.id)}
              >
                <div className="flex gap-2 mb-4">
                  <p>{booking.jam_awal}</p>
                  <p>-</p>
                  <p>{booking.jam_akhir}</p>
                </div>
                <p className="text-xs">{booking.status}</p>
                <p className="text-[#0C8868]">{booking.harga_visit}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
