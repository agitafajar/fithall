"use client";

import React, { useEffect, useState } from "react";
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
import ConfirmationModal from "@/app/components/modal/ConfirmationModal";
import { getISOWeek } from "date-fns";

export default function ListBookingPage() {
  const [_, setSelectedBookingIds] = useState<string[]>([]);
  const [isLoadingMap, setIsLoadingMap] = useState<{ [id: string]: boolean }>(
    {}
  );
  const [isModalOpen, setModalOpen] = useState(false);
  const [bookingID, setBookingID] = useState("");
  const duplicatedIds: any[] = [];
  const loggedIds: any[] = [];
  let totalSubTotal = 0;

  const [selectedWeek, setSelectedWeek] = useState(() => {
    const currentDate = new Date();
    const weekNumber = getISOWeek(currentDate);
    return `${currentDate.getFullYear()}-W${weekNumber}`;
  });

  const handleWeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedWeek(e.target.value);
    refetchListHarga();
  };

  const getStartDateOfWeek = (isoWeek: string): string => {
    const [year, week] = isoWeek.split("-W");
    const januaryFourth = new Date(Number(year), 0, 4);
    const firstSaturday = new Date(januaryFourth.getTime());
    firstSaturday.setDate(
      januaryFourth.getDate() - ((januaryFourth.getDay() + 6) % 7)
    );
    const startDate = new Date(firstSaturday.getTime());
    startDate.setDate(startDate.getDate() + (Number(week) - 1) * 7);
    const formattedStartDate = startDate.toISOString().split("T")[0];

    return formattedStartDate;
  };

  const startDateOfSelectedWeek = getStartDateOfWeek(selectedWeek);

  const urlSearchParams = useSearchParams();
  const ids = urlSearchParams.get("id");
  const namas = urlSearchParams.get("nama") || "";
  const cabangId = urlSearchParams.get("cabang_id") || "";

  const {
    data: dataCart,
    isLoading: loadingCart,
    isError: errorCart,
    refetch: refetchCart,
  } = useGetCart();
  const listData = dataCart?.data?.cart;
  const totalCart = dataCart?.data?.cart.length || "";
  const idInCart = dataCart?.data?.cart?.[0]?.booking.lapangan.cabang_id | 0;
  const [idx, setIdx] = useState<number>(Number(cabangId));

  const {
    data: listHarga,
    isLoading: loadingListHarga,
    isError: errorListHarga,
    refetch: refetchListHarga,
  } = useGetListHarga(Number(ids), startDateOfSelectedWeek);

  const handleToggleToCart = async (id: any) => {
    const isIdInLoggedIds = loggedIds.includes(id);
    const noIsIdInLoggedIds = duplicatedIds.includes(id);

    setIsLoadingMap((prevLoadingMap) => ({ ...prevLoadingMap, [id]: true }));

    if (idInCart === idx) {
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
        setIsLoadingMap((prevLoadingMap) => ({
          ...prevLoadingMap,
          [id]: false,
        }));
        refetchCart();
      }
    }
    if (idInCart !== idx) {
      setModalOpen(true);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setIsLoadingMap((prevLoadingMap) => ({
      ...prevLoadingMap,
      [bookingID]: false,
    }));
  };

  const confirmAction = async () => {
    setModalOpen(false);
    const isIdInLoggedIds = loggedIds.includes(bookingID);
    const noIsIdInLoggedIds = duplicatedIds.includes(bookingID);

    setIsLoadingMap((prevLoadingMap) => ({
      ...prevLoadingMap,
      [bookingID]: true,
    }));
    try {
      if (isIdInLoggedIds && !noIsIdInLoggedIds) {
        setSelectedBookingIds((prevSelectedIds) => [
          ...prevSelectedIds,
          bookingID,
        ]);
        const token = Cookies.get("token");
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        await axiosInstance.get(`/add-cart/${bookingID}`, {
          headers,
        });
      } else {
        setSelectedBookingIds((prevSelectedIds) =>
          prevSelectedIds.filter((selectedId) => selectedId !== bookingID)
        );
        const token = Cookies.get("token");
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        await axiosInstance.get(`/remove-cart/${bookingID}`, {
          headers,
        });
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoadingMap((prevLoadingMap) => ({
        ...prevLoadingMap,
        [bookingID]: false,
      }));
      refetchCart();
    }
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
        selectedWeek={selectedWeek}
        onWeekChange={handleWeekChange}
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
                      setIdx(booking.lapangan.cabang_id);
                      handleToggleToCart(booking.id);
                      setBookingID(booking.id);
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

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={confirmAction}
        cancelButtonText="Batalkan"
        confirmButtonText="Konfirmasi"
        message={
          "Anda sudah memasukkan jadwal cabang lain pada cart, ingin cancel pilihan anda sebelumnya?"
        }
      />
    </>
  );
}
