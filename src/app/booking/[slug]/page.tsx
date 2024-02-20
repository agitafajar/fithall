"use client";

import React, { useState } from "react";
import ErrorPage from "@/app/error";
import LoadingPage from "@/app/loading";
import useGetListHarga from "@/features/cabang/useGetListHarga";
import useGetCart from "@/features/cabang/useGetCart";
import axiosInstance from "@/lib/axios";
import ClipLoader from "react-spinners/ClipLoader";
import DateFilter from "@/app/components/cards/BannerDateFilter";
import { formatToCurrency } from "@/lib/formatTimeCurrency";
import Cookies from "js-cookie";
import { useSearchParams } from "next/navigation";
import CartActions from "@/app/components/cards/CartActions";

export default function ListBookingPage() {
  const [_, setSelectedBookingIds] = useState<string[]>([]);
  const [isLoadingMap, setIsLoadingMap] = useState<{ [id: string]: boolean }>(
    {}
  );
  const duplicatedIds: any[] = [];
  const loggedIds: any[] = [];
  let totalSubTotal = 0;
  const [selectedDate, setSelectedDate] = useState(() => {
    const currentDate = new Date();
    return currentDate.toISOString().split("T")[0];
  });

  const urlSearchParams = useSearchParams();
  const ids = urlSearchParams.get("id");
  const namas = urlSearchParams.get("nama") || "";

  const {
    data: dataCart,
    isLoading: loadingCart,
    isError: errorCart,
    refetch: refetchCart,
  } = useGetCart();
  const listData = dataCart?.data?.cart;
  const totalCart = dataCart?.data?.cart.length || "";

  const {
    data: listHarga,
    isLoading: loadingListHarga,
    isError: errorListHarga,
    refetch: refetchListHarga,
  } = useGetListHarga(Number(ids), selectedDate);

  const handleToggleToCart = async (id: any) => {
    const isIdInLoggedIds = loggedIds.includes(id);
    const noIsIdInLoggedIds = duplicatedIds.includes(id);

    setIsLoadingMap((prevLoadingMap) => ({ ...prevLoadingMap, [id]: true }));

    try {
      if (isIdInLoggedIds && !noIsIdInLoggedIds) {
        setSelectedBookingIds((prevSelectedIds) => [...prevSelectedIds, id]);
        const token = Cookies.get("token");
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        await axiosInstance.get(`/add-cart/${id}`, {
          headers,
        });
      } else {
        setSelectedBookingIds((prevSelectedIds) =>
          prevSelectedIds.filter((selectedId) => selectedId !== id)
        );
        const token = Cookies.get("token");
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        await axiosInstance.get(`/remove-cart/${id}`, {
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

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
    refetchListHarga();
  };

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

  if (loadingCart || loadingListHarga) {
    return <LoadingPage />;
  }

  if (errorCart || errorListHarga) {
    return <ErrorPage />;
  }

  return (
    <>
      <DateFilter
        selectedDate={selectedDate}
        onDateChange={handleDateChange}
        title={namas}
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
                    booking.is_expired === true
                      ? "bg-[#323F4B] text-white cursor-not-allowed"
                      : booking.status === "BOOKED"
                      ? "bg-[#F99C9C] cursor-not-allowed"
                      : booking.status === "AVAILABLE"
                      ? duplicatedIds.includes(booking.id)
                        ? "bg-[#0C8C6B] cursor-pointer text-white"
                        : "bg-white cursor-pointer"
                      : booking.status === "ORDER" &&
                        duplicatedIds.includes(booking.id)
                      ? "bg-[#0C8C6B] cursor-pointer text-white"
                      : "bg-[#F3DB90] cursor-pointer"
                  }`}
                  onClick={() => {
                    if (
                      booking.status !== "BOOKED" &&
                      booking.is_expired !== true
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
                      <p className="text-xs">
                        {booking.status === "ORDER"
                          ? "WAITING LIST"
                          : booking.is_expired
                          ? "EXPIRED"
                          : booking.status}
                      </p>
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
          <CartActions totalSubTotal={totalSubTotal} totalCart={totalCart} />
        </>
      ) : null}
    </>
  );
}
