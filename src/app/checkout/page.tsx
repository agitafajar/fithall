/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";

import useGetCart from "@/features/cabang/useGetCart";
import error from "next/error";
import ErrorPage from "../error";
import LoadingPage from "../loading";
import useGetRemoveCart from "@/features/cabang/useGetRemoveCart";
import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import BookingDetailCard from "../components/cards/BookingDetailCard";
import { formatToCurrency } from "@/lib/formatTimeCurrency";
import ProfileFormCard from "../components/cards/ProfileFormCard";
import EmptyStatePage from "../components/cards/EmptyStateCard";

export default function CheckoutPage() {
  const [isDeleteLoadingMap, setIsDeleteLoadingMap] = useState<{
    [id: string]: boolean;
  }>({});
  const [isGetId, setIsGetId] = useState<string>("");
  const [isAgreed, setIsAgreed] = useState(false);
  let totalSubTotal = 0;
  let totalPajak = 0;
  let totalSubTotalPembayaran = 0;
  const handleCheckboxChange = () => {
    setIsAgreed(!isAgreed);
  };

  const {
    data: dataCart,
    isLoading: isGetCart,
    error,
    refetch: refetchCart,
  } = useGetCart();
  const listData = dataCart?.data?.cart;

  const { refetch: refetchDataRemove, isLoading: isDeleteLoading } =
    useGetRemoveCart(isGetId);

  const isLoading = isGetCart || isDeleteLoading;

  const handleDeleteItem = async (id: string) => {
    setIsGetId(id);
    setIsDeleteLoadingMap((prevLoadingMap) => ({
      ...prevLoadingMap,
      [id]: true,
    }));

    try {
      await refetchDataRemove();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsDeleteLoadingMap((prevLoadingMap) => ({
        ...prevLoadingMap,
        [id]: false,
      }));
      refetchCart();
    }
  };

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
    <>
      {listData.length > 0 ? (
        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-2 p-6 rounded-lg border-2">
            <p className="mb-4 border-b-2 font-bold text-4xl pb-4">Checkout</p>
            <p className="text-xl font-bold mb-2">Data Perwakilan Pemain</p>
            <div className="rounded-md">
              <ProfileFormCard label="Pilih Profile" id="profile" />
              <ProfileFormCard label="Nama" id="nama" />
              <ProfileFormCard label="Nama Instansi" id="instansi" />
              <ProfileFormCard label="Nomor WA" id="wa" type="tel" />
              <ProfileFormCard label="Email" id="email" type="email" />
              <div className="mb-4">
                <label className="block text-sm font-bold text-gray-700">
                  Jenis Kelamin
                </label>
                <div className="mt-1">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio "
                      name="jenis_kelamin"
                      value="laki-laki"
                    />
                    <span className="ml-2">Laki-laki</span>
                  </label>
                  <label className="inline-flex items-center ml-6">
                    <input
                      type="radio"
                      className="form-radio"
                      name="jenis_kelamin"
                      value="perempuan"
                    />
                    <span className="ml-2">Perempuan</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-1 bg-[#F7F7FC] p-6">
            <p className="font-bold text-xl text-center mb-2">Detail Booking</p>
            <p className="text-{#7B8794] text-sm text-center pb-6 border-b-2">
              Pastikan booking yang anda lakukan sudah benar
            </p>
            <div className="my-6 border-b-2 pb-6">
              {listData.map((bookingItem: any) => {
                const full_name = bookingItem.booking.lapangan.full_name;
                const pretty_date = bookingItem.booking.pretty_date;
                const harga_visit = bookingItem.booking.harga_visit;
                const id = bookingItem.booking_id;
                const subTotal =
                  (harga_visit * listData.length) / listData.length;
                const pajak = (0.76 / 100) * subTotal;
                const subPembayaran = subTotal + pajak;

                totalSubTotal += subTotal;
                totalPajak += pajak;
                totalSubTotalPembayaran += subPembayaran;

                return (
                  <div
                    key={bookingItem.booking.id}
                    className="mb-4 flex justify-between items-center"
                  >
                    <BookingDetailCard
                      key={bookingItem.booking.id}
                      full_name={bookingItem.booking.lapangan.full_name}
                      pretty_date={bookingItem.booking.pretty_date}
                      harga_visit={bookingItem.booking.harga_visit}
                      id={bookingItem.booking_id}
                      isDeleteLoading={
                        isDeleteLoadingMap[bookingItem.booking_id]
                      }
                      onDelete={handleDeleteItem}
                    />
                  </div>
                );
              })}
            </div>
            <div className="my-6 border-b-2 pb-6">
              <div className="flex justify-between mb-4">
                <p>Sub Total</p>
                <p className="font-bold">{formatToCurrency(totalSubTotal)}</p>
              </div>

              <div className="flex justify-between">
                <p>Biaya QRIS + Pajak (0,76%)</p>
                <p className="font-bold">{formatToCurrency(totalPajak)}</p>
              </div>
            </div>
            <div className="flex justify-between">
              <p>Total Pembayaran</p>
              <p className="font-bold">
                {formatToCurrency(totalSubTotalPembayaran)}
              </p>
            </div>
            <div className="my-4 flex">
              <input
                type="checkbox"
                id="agreeCheckbox"
                checked={isAgreed}
                onChange={handleCheckboxChange}
                className="mr-2 w-6"
              />
              <label
                htmlFor="agreeCheckbox"
                className=" text-gray-700 flex flex-col"
              >
                Saya setuju dengan tata tertib yang berlaku
                <p className="text-xs text-[#7B8794]">Detail Tata Tertib</p>
              </label>
            </div>
            <div className="my-6 pb-2">
              <button
                type="submit"
                className={`bg-primary mb-4 text-white py-2 md:py-3 rounded-md text-sm border-2 border-primary w-full font-semibold ${
                  !isAgreed && "opacity-50 cursor-not-allowed"
                }`}
                disabled={!isAgreed}
              >
                {isLoading ? "Submitting..." : "Proses Pembayaran"}
              </button>
              <div className="flex gap-2 items-center mt-4 text-sm">
                <img src="../assets/png/info-checkout.png" />
                <p>
                  Ini halaman terakhir dari proses pembelianmu. Pastikan semua
                  sudah benar ya.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <EmptyStatePage
          imageUrl="../assets/png/empty-state-cart.png"
          title="The cart is empty"
          text="Please make a reservation firsl"
          linkTo="/"
          linkText="Back to Home"
        />
      )}
    </>
  );
}
