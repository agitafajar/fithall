"use client";

import React, { useState } from "react";
import BannerCard from "@/app/components/cards/BannerCard";
import ErrorPage from "@/app/error";
import LoadingPage from "@/app/loading";
import useGetDetailLapangan from "@/features/cabang/useGetDetailLapangan";
import useGetListHarga from "@/features/cabang/useGetListHarga";
import useGetCart from "@/features/cabang/useGetCart";
import axiosInstance from "@/lib/axios";
import ClipLoader from "react-spinners/ClipLoader";

export default function ListBookingPage({
  params,
}: {
  params: { slug: string };
}) {
  const title = params.slug;
  const icon = "../assets/png/fithall-circle.png";
  const [selectedBookingIds, setSelectedBookingIds] = useState<string[]>([]);
  const { data: dataCart, refetch: refetchCart } = useGetCart();
  const [isLoadingMap, setIsLoadingMap] = useState<{ [id: string]: boolean }>(
    {}
  );
  const listData = dataCart?.data?.cart;
  const duplicatedIds: any[] = [];
  const loggedIds: any[] = [];

  const handleToggleToCart = async (id: any) => {
    console.log("Item toggled to cart with id:", id);

    // Cek apakah id ada di dalam loggedIds
    const isIdInLoggedIds = loggedIds.includes(id);
    const noIsIdInLoggedIds = duplicatedIds.includes(id);

    setIsLoadingMap((prevLoadingMap) => ({ ...prevLoadingMap, [id]: true }));

    try {
      if (isIdInLoggedIds && !noIsIdInLoggedIds) {
        setSelectedBookingIds((prevSelectedIds) => [...prevSelectedIds, id]);
        const token = localStorage.getItem("token");
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const cabangResponse = await axiosInstance.get(`/add-cart/${id}`, {
          headers,
        });
      } else {
        setSelectedBookingIds((prevSelectedIds) =>
          prevSelectedIds.filter((selectedId) => selectedId !== id)
        );
        const token = localStorage.getItem("token");
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const cabangResponse = await axiosInstance.get(`/remove-cart/${id}`, {
          headers,
        });
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoadingMap((prevLoadingMap) => ({ ...prevLoadingMap, [id]: false }));
      refetchCart();
    }
  };

  const {
    data: cabangDataLapangan,
    isLoading: lapanganLoading,
    isError: lapanganError,
  } = useGetDetailLapangan(params.slug);

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

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
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
            {groupedBookings[date].map((booking) => {
              const isLoadingForCard = isLoadingMap[booking.id];

              if (!loggedIds.includes(booking.id)) {
                loggedIds.push(booking.id);
              }
              if (
                listData?.some((index: any) => index.booking_id === booking.id)
              ) {
                duplicatedIds.push(booking.id);
              }

              return (
                <div
                  key={booking.id}
                  className={`py-2 px-6 rounded-xl border-2 mb-8 ${
                    booking.status === "BOOKED"
                      ? "bg-[#F99C9C]"
                      : booking.status === "AVAILABLE"
                      ? duplicatedIds.includes(booking.id)
                        ? "bg-[#0C8C6B] cursor-pointer text-white"
                        : "bg-white cursor-pointer"
                      : booking.status === "ORDER"
                      ? "bg-[#F3DB90]"
                      : ""
                  }`}
                  onClick={() => handleToggleToCart(booking.id)}
                >
                  {!isLoadingForCard ? (
                    <>
                      <div className="flex gap-2 pb-4 ">
                        <p>{booking.jam_awal}</p>
                        <p>-</p>
                        <p>{booking.jam_akhir}</p>
                      </div>
                      <p className="text-xs">{booking.status}</p>
                      <p
                        className={`${
                          duplicatedIds.includes(booking.id)
                            ? "text-white"
                            : "text-[#0C8868]"
                        }`}
                      >
                        {booking.harga_visit}
                      </p>
                    </>
                  ) : (
                    <div className="  flex justify-center items-center py-6">
                      <ClipLoader color="green" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
}
