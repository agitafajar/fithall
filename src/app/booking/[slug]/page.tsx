"use client";

import React, { useState } from "react";
import ErrorPage from "@/app/error";
import LoadingPage from "@/app/loading";
import useGetListHarga from "@/features/cabang/useGetListHarga";
import useGetCart from "@/features/cabang/useGetCart";
import axiosInstance from "@/lib/axios";
import ClipLoader from "react-spinners/ClipLoader";
import { formatToCurrency } from "@/lib/formatTimeCurrency";
import Cookies from "js-cookie";
import { useSearchParams } from "next/navigation";
import CartActions from "@/app/components/cards/CartActions";
import ConfirmationModal from "@/app/components/modal/ConfirmationModal";
import DatePicker from "react-datepicker";
import { isSameISOWeek, startOfWeek } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

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

  const urlSearchParams = useSearchParams();
  const ids = urlSearchParams.get("id");
  const namas = urlSearchParams.get("nama") || "";
  const cabangId = urlSearchParams.get("cabang_id") || "";

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const convertDate = (date: any) => {
    let dt = new Date(date);
    return `${dt.getFullYear()}-${dt.getMonth() + 1}-${dt.getDate()}`;
  };

  const firstDayOfWeek = startOfWeek(selectedDate || new Date(), {
    weekStartsOn: 0,
  });

  const {
    data: dataCart,
    isLoading: loadingCart,
    isError: errorCart,
    refetch: refetchCart,
  } = useGetCart();
  const listData = dataCart?.data?.cart;
  const totalCart = dataCart?.data?.cart.length || "";
  const idInCart =
    dataCart?.data?.cart?.[0]?.booking.lapangan.cabang_id | Number(cabangId);
  const [idx, setIdx] = useState<number>(Number(cabangId));

  const {
    data: listHarga,
    isLoading: loadingListHarga,
    isError: errorListHarga,
  } = useGetListHarga(Number(ids), convertDate(firstDayOfWeek));

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

  const formatAndGroupBookings = (data: any) => {
    const groupedBookings: { [date: string]: any[] } = {};

    data?.forEach((listDataHarga: any) => {
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

    return groupedBookings;
  };

  const groupedBookings = formatAndGroupBookings(listHarga?.data);

  if (loadingCart || loadingListHarga) {
    return <LoadingPage />;
  }

  if (errorCart || errorListHarga) {
    return <ErrorPage />;
  }

  return (
    <>
      <div className="w-full flex flex-col items-center justify-center h-[330px] mb-12 text-white">
        <div
          className="flex justify-center relative bg-cover bg-center w-full h-full rounded-3xl items-center p-24 -mb-12"
          style={{ backgroundImage: "url('../assets/png/home-banner.png')" }}
        >
          <div className="flex flex-col justify-center items-center relative z-10 mt-24 ">
            <p className="font-bold sm:text-3xl md:text-4xl lg:text-4xl xl:text-4xl text-4xl text-white mb-6 capitalize">
              {namas}
            </p>
            <div className="text-left">
              <p className="text-xs mb-2">Pilih Tanggal Booking</p>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date as Date | undefined)}
                showWeekNumbers
                dayClassName={(date: Date) =>
                  isSameISOWeek(date, selectedDate || new Date())
                    ? "react-datepicker__day--selected"
                    : ""
                }
                calendarStartDay={0}
                onWeekSelect={(...obj) => {
                  console.log(obj);
                }}
                className=" text-black py-2 px-6 rounded-xl"
              />
            </div>
            <p className="text-sm font-bold mt-2">
              Note - Pilih Jadwal Di Bawah Ini
            </p>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent rounded-3xl"></div>
        </div>
      </div>

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
