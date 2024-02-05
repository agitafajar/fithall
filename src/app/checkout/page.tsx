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

export default function CheckoutPage() {
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

  const formatToCurrency = (value: any) => {
    const formattedValue = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);

    return formattedValue;
  };

  return (
    <>
      <div className="grid grid-cols-3 gap-3">
        <div className="col-span-2 p-6 rounded-lg border-2">
          <p className="mb-4 border-b-2 font-bold text-4xl pb-4">Checkout</p>
          <p className="text-xl font-bold mb-2">Data Perwakilan Pemain</p>
          <div className="rounded-md">
            <div className="mb-4">
              <label
                htmlFor="profile"
                className="block text-sm font-bold text-gray-700"
              >
                Pilih Profile
              </label>
              <select
                id="profile"
                name="profile"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md bg-[#F0F1F5]"
              >
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="nama"
                className="block text-sm font-bold text-gray-700"
              >
                Nama
              </label>
              <input
                type="text"
                id="nama"
                name="nama"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md bg-[#F0F1F5]"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="instansi"
                className="block text-sm font-bold text-gray-700"
              >
                Nama Instansi
              </label>
              <input
                type="text"
                id="instansi"
                name="instansi"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md bg-[#F0F1F5]"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="wa"
                className="block text-sm font-bold text-gray-700"
              >
                Nomor WA
              </label>
              <input
                type="tel"
                id="wa"
                name="wa"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md bg-[#F0F1F5]"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-bold text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md bg-[#F0F1F5]"
              />
            </div>

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
                  <div className="text-[#323F4B]">
                    <p className="font-bold text-sm mb-1">{full_name}</p>
                    <p>{pretty_date}</p>
                    <p>{formatToCurrency(harga_visit)}</p>
                  </div>
                  <div>
                    {isDeleteLoading ? (
                      <ClipLoader color="red" />
                    ) : (
                      <img
                        src="../assets/png/trash.png"
                        className="cursor-pointer"
                        onClick={() => {
                          setIsGetId(id);
                          refetchDataRemove();
                        }}
                      />
                    )}
                  </div>
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
              {isLoading ? "Logging in..." : "Proses Pembayaran"}
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
    </>
  );
}
