"use client";

import React, { useState, useEffect } from "react";
import ErrorPage from "@/app/error";
import LoadingPage from "@/app/loading";
import useGetDetailLapangan from "@/features/cabang/useGetDetailLapangan";
import useGetListHarga from "@/features/cabang/useGetListHarga";
import useGetCart from "@/features/cabang/useGetCart";
import axiosInstance from "@/lib/axios";
import ClipLoader from "react-spinners/ClipLoader";
import DateFilter from "@/app/components/cards/BannerDateFilter";
import Link from "next/link";
import { formatToCurrency } from "@/lib/formatTimeCurrency";
import { format, subMinutes, addHours, addMinutes } from "date-fns";
import Cookies from "js-cookie";

export default function ListBookingPage({
  params,
}: {
  params: { slug: string };
}) {
  const [selectedBookingIds, setSelectedBookingIds] = useState<string[]>([]);
  const { data: dataCart, refetch: refetchCart } = useGetCart();
  const [isLoadingMap, setIsLoadingMap] = useState<{ [id: string]: boolean }>(
    {}
  );
  const listData = dataCart?.data?.cart;
  const duplicatedIds: any[] = [];
  const loggedIds: any[] = [];
  const totalCart = dataCart?.data?.cart.length || "";
  let totalSubTotal = 0;

  const [isTimeBefore, setIsTimeBefore] = useState(false);

  useEffect(() => {
    const fullBook = new Date("2024-02-07 10:30:00");
    const thirtyMinutesBeforeStart = subMinutes(fullBook, 30);
    const thirtyMinutesAfterEnd = addMinutes(addHours(fullBook, 1), -30);

    const currentTime = new Date();
    console.log("fullBook", fullBook);
    console.log("thirtyMinutesBeforeStart", thirtyMinutesBeforeStart);
    console.log("thirtyMinutesAfterEnd", thirtyMinutesAfterEnd);
    console.log("currentTime", currentTime);
    console.log("isTimeBefore", isTimeBefore);

    setIsTimeBefore(
      currentTime >= thirtyMinutesBeforeStart &&
        currentTime <= thirtyMinutesAfterEnd
    );
  }, [isTimeBefore]);

  const handleToggleToCart = async (id: any) => {
    const isIdInLoggedIds = loggedIds.includes(id);
    const noIsIdInLoggedIds = duplicatedIds.includes(id);

    setIsLoadingMap((prevLoadingMap) => ({ ...prevLoadingMap, [id]: true }));

    try {
      if (isIdInLoggedIds && !noIsIdInLoggedIds) {
        setSelectedBookingIds((prevSelectedIds) => [...prevSelectedIds, id]);
        const token = Cookies.get("token");
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const cabangResponse = await axiosInstance.get(`/add-cart/${id}`, {
          headers,
        });
      } else {
        setSelectedBookingIds((prevSelectedIds) =>
          prevSelectedIds.filter((selectedId) => selectedId !== id)
        );
        const token = Cookies.get("token");
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
    const tanggal = new Date(date);
    const hari = tanggal.toLocaleDateString("id-ID", { weekday: "long" });

    listDataHarga.hari = hari;

    const dateString = new Date(date);

    const timeFormat: Intl.DateTimeFormatOptions = {
      month: "numeric",
      day: "2-digit",
      year: "numeric",
      timeZone: "Asia/Jakarta",
    };

    const formattedDate = dateString.toLocaleDateString("id-ID", timeFormat);
    listDataHarga.formattedDate = formattedDate;

    if (!groupedBookings[date]) {
      groupedBookings[date] = [listDataHarga];
    } else {
      groupedBookings[date].push(listDataHarga);
    }
  });

  return (
    <>
      <DateFilter
        selectedDate={selectedDate}
        onDateChange={handleDateChange}
        title={cabangDataLapangan?.data.nama}
      />

      <div className="flex gap-4 font-bold text-center justify-between overflow-auto overflow-y-auto">
        {Object.keys(groupedBookings).map((date) => (
          <div key={date}>
            <div className="mb-6 pb-6 border-b-2 ">
              <div className="mb-2 border-2 rounded-xl px-4 py-2 bg-[#CBF1D9]">
                <p className="mb-4 font-bold text-xl">
                  {groupedBookings[date][0].hari}
                </p>
                <p className="text-sm text-[#7F7F7F]">
                  {groupedBookings[date][0].formattedDate}
                </p>
              </div>
            </div>
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
                  className={`py-2 px-6 rounded-xl border-2 mb-8  ${
                    booking.status === "BOOKED"
                      ? "bg-[#F99C9C] cursor-not-allowed"
                      : booking.status === "AVAILABLE"
                      ? duplicatedIds.includes(booking.id)
                        ? "bg-[#0C8C6B] cursor-pointer text-white"
                        : "bg-white cursor-pointer"
                      : booking.status === "ORDER"
                      ? "bg-[#F3DB90] cursor-not-allowed"
                      : ""
                  }`}
                  onClick={() => {
                    if (
                      booking.status !== "BOOKED" &&
                      booking.status !== "ORDER"
                    ) {
                      handleToggleToCart(booking.id);
                    }
                  }}
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
                        {formatToCurrency(booking.harga_visit)}
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
      {listData.map((index: any) => {
        const harga_visit = index.booking.harga_visit;
        const subTotal = (harga_visit * listData.length) / listData.length;

        totalSubTotal += subTotal;
      })}

      {duplicatedIds.length > 0 ? (
        <>
          <div className="sm:hidden md:flex lg:flex xl:flex w-full border-t-2 fixed items-center bottom-0 left-0  px-4 md:px-24 bg-white z-[3000] flex gap-2 justify-end">
            <div className="mr-4">
              <p className="text-xs">Total Amount</p>
              <p className="font-bold text-primary">
                {formatToCurrency(totalSubTotal)}
              </p>
            </div>
            <Link
              href="/checkout"
              className="cursor-pointer mr-4 my-4 border-2 border-primary py-3 md:py-2 md:my-2 text-primary bg-white px-8 rounded-md font-semibold text-sm"
            >
              + Keranjang
            </Link>
            <Link
              href="/checkout"
              className="cursor-pointer mr-4 my-4 lg:my-4 border-2 border-primary py-3 md:py-2 md:my-2 text-white bg-primary px-8 rounded-md font-semibold text-sm"
            >
              Checkout ({totalCart} Items)
            </Link>
          </div>

          <div className="sm:flex flex-col md:hidden lg:hidden xl:hidden w-full border-t-2 fixed items-start bottom-0 left-0  p-4 bg-white z-[3000] flex gap-2 justify-end">
            <div className="mr-4">
              <p className="text-xs">Total Amount</p>
              <p className="font-bold text-primary">
                {formatToCurrency(totalSubTotal)}
              </p>
            </div>
            <div className="flex">
              <Link
                href="/checkout"
                className="cursor-pointer mr-4 my-4 border-2 border-primary py-3 md:py-2 md:my-2 text-primary bg-white px-8 rounded-md font-semibold text-sm"
              >
                + Keranjang
              </Link>
              <Link
                href="/checkout"
                className="cursor-pointer mr-4 my-4 lg:my-4 border-2 border-primary py-3 md:py-2 md:my-2 text-white bg-primary px-8 rounded-md font-semibold text-sm"
              >
                Checkout ({totalCart} Items)
              </Link>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
