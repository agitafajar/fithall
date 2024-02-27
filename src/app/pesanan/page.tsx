/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";

import ErrorPage from "@/app/error";
import LoadingPage from "@/app/loading";
import useGetInvoice from "@/features/cabang/useGetInvoice";
import { formatToCurrency } from "@/lib/formatTimeCurrency";
import { formatDate } from "@/lib/formatDate";
import { useRef, useState } from "react";
import QRCode from "qrcode.react";
import html2canvas from "html2canvas";

export default function PesananPage({ params }: { params: { slug: string } }) {
  const { data, isLoading, error } = useGetInvoice(params.slug);
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
      <div className="flex justify-start items-center w-full flex-col">
        <p className="sm:w-full md:w-[770px] lg:w-[770px] xl:w-[770px] font-bold text-3xl pb-4 border-b-2 mb-4">
          Pesanan Saya
        </p>
        <div className="sm:w-full md:w-[770px] lg:w-[770px] xl:w-[770px] bg-[#F7F7FC] p-4 rounded-xl flex flex-col gap-4 justify-center items-center mb-8">
          <div className=" w-full">
            <div className=" flex justify-between items-center">
              <div>
                <p className="text-[#323F4B] text-sm">Invoice #022844</p>
                <p className="font-bold">3-Feb-2024 15:13:25</p>
              </div>
              <div className="py-1 sm:px-2 text-center md:px-4 lg:px-4 xl:px-4 font-bold rounded-full text-sm bg-[#F9EDC7] text-[#E28600]">
                Menunggu Pembayaran
              </div>
            </div>
          </div>
          <div className=" w-full border-y-2 py-4">
            <div className=" flex gap-2 items-center">
              <img src="../assets/png/fithall-circle.png" className="size-12" />
              <div>
                <p className=" font-bold">Fithall Cabang Mampang</p>
                <p className="text-[#323F4B]">2 Jadwal</p>
              </div>
            </div>
          </div>
          <div className=" w-full">
            <div className=" flex justify-between items-center cursor-pointer">
              <div>
                <p className="text-[#323F4B] text-sm">Total Harga</p>
                <p className="font-bold text-primary">Rp. 151.132</p>
              </div>
              <div className="ring-1 ring-[#0C8C6B] text-[#0C8C6B] font-bold py-2 px-6 rounded-full">
                Lihat Detail
              </div>
            </div>
          </div>
        </div>

        <div className="sm:w-full md:w-[770px] lg:w-[770px] xl:w-[770px] bg-[#F7F7FC] p-4 rounded-xl flex flex-col gap-4 justify-center items-center">
          <div className=" w-full">
            <div className=" flex justify-between items-center">
              <div>
                <p className="text-[#323F4B] text-sm">Invoice #022844</p>
                <p className="font-bold">3-Feb-2024 15:13:25</p>
              </div>
              <div className="py-1 px-4 font-bold rounded-full text-sm bg-[#FBCBD0] text-[#E02B2B]">
                Expired
              </div>
            </div>
          </div>
          <div className=" w-full border-y-2 py-4">
            <div className=" flex gap-2 items-center">
              <img src="../assets/png/fithall-circle.png" className="size-12" />
              <div>
                <p className=" font-bold">Fithall Cabang Mampang</p>
                <p className="text-[#323F4B]">2 Jadwal</p>
              </div>
            </div>
          </div>
          <div className=" w-full">
            <div className=" flex justify-between items-center cursor-pointer">
              <div>
                <p className="text-[#323F4B] text-sm">Total Harga</p>
                <p className="font-bold text-primary">Rp. 151.132</p>
              </div>
              <div className="ring-1 ring-[#0C8C6B] text-[#0C8C6B] font-bold py-2 px-6 rounded-full">
                Lihat Detail
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
