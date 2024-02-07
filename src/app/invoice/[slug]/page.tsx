/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";

import ErrorPage from "@/app/error";
import LoadingPage from "@/app/loading";
import useGetInvoice from "@/features/cabang/useGetInvoice";
import { formatToCurrency } from "@/lib/formatTimeCurrency";
import { formatDate } from "@/lib/formatDate";

export default function DetailInvoicePage({
  params,
}: {
  params: { slug: string };
}) {
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
      <div className="flex justify-center w-full">
        <div className="max-w-3xl p-6 bg-[#F7F7FC] flex flex-col gap-3 justify-center items-center">
          <img
            src="../assets/png/fithall-logo.png"
            width="100px"
            className="mb-6"
          />
          <p className="text-[#0C8B6A] font-bold text-sm">
            Invoice {data?.data.kode_invoice}
          </p>
          <p>{formatDate(data?.data.tanggal_invoice)}</p>
          <p
            className={`text-sm py-2 px-4 rounded-full font-bold mb-4 ${
              data?.data.status === "EXPIRED"
                ? "bg-[#FBCBD0] text-[#E02B2B]"
                : data?.data.status === "WAITING FOR PAYMENT"
                ? "bg-[#F9EDC7] text-[#E28600]"
                : data?.data.status === "PAID"
                ? "bg-[#CCFFDE] text-[#25A953]"
                : "bg-black text-white"
            }`}
          >
            {data?.data.status}
          </p>

          <div className="pb-4 border-b-2 pt-8 border-t-2">
            <p className="font-bold mb-2">
              Fithall Cabang {data?.data.cabang.nama}
            </p>
            <p>{data?.data.cabang.alamat}</p>
            <p>{data?.data.cabang.cp_email}</p>
            <p>{data?.data.cabang.cp_wa}</p>
          </div>
          <div className="pb-4 border-b-2 pt-4 w-full">
            <p className="font-bold mb-2">{data?.data.instansi}</p>
            <p> {data?.data.nama}</p>
            <p> {data?.data.cp_email}</p>
            <p> {data?.data.cp_wa}</p>
          </div>

          <div className="flex flex-col pt-4 w-full">
            <p className="font-bold mb-2"> Detail Lapangan</p>
            {data?.data.invoice_detail.map((listDetail: any) => {
              return (
                <div
                  key={listDetail.booking_id}
                  className="flex flex-col gap-4"
                >
                  <div className="flex justify-between">
                    <p className="w-[50%]">{listDetail.deskripsi}</p>
                    <p>{formatToCurrency(listDetail.subtotal)}</p>
                  </div>
                  <div className="flex justify-between border-b-2 pb-4">
                    <p>Biaya Transaksi</p>
                    <p>{formatToCurrency(data?.data.biaya_transaksi)}</p>
                  </div>
                  <div className="flex justify-between mt-4">
                    <p>Total Harga</p>
                    <p>{formatToCurrency(data?.data.total)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {data?.data.status === "WAITING FOR PAYMENT" ? (
        <div className="w-full border-t-2 fixed items-center bottom-0 left-0  px-4 md:px-24 bg-white z-[3000] flex gap-2 justify-end">
          <div className="mr-4">
            <p className="text-xs">Total Amount</p>
            <p className="font-bold text-primary">
              {formatToCurrency(data?.data.total)}
            </p>
          </div>

          <div className="cursor-pointer mr-4 my-4 border-2 border-primary md:py-2 text-white bg-primary px-8 rounded-md font-semibold text-sm">
            Bayar Sekarang
          </div>
        </div>
      ) : data?.data.status === "EXPIRED" ? (
        <div className="w-full border-t-2 fixed items-center bottom-0 left-0 p-4 font-bold md:px-24 bg-[#FBCBD0] text-[#E02B2B] z-[3000] flex gap-2 justify-center">
          <p>EXPIRED</p>
        </div>
      ) : data?.data.status === "PAID" ? (
        <div className="w-full border-t-2 fixed items-center bottom-0 left-0 p-4 font-bold md:px-24 bg-[#CCFFDE] text-[#25A953] z-[3000] flex gap-2 justify-center">
          <p>PAID</p>
        </div>
      ) : null}
    </>
  );
}
