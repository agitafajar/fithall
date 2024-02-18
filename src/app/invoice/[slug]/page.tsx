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

export default function DetailInvoicePage({
  params,
}: {
  params: { slug: string };
}) {
  const { data, isLoading, error } = useGetInvoice(params.slug);
  const [showModal, setShowModal] = useState(false);
  const paymentString = data?.data.qr_string;
  const qrCodeRef = useRef(data?.data.qr_string);

  const handleButtonClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const convertToQRCode = (data: any) => {
    return new Promise((resolve, reject) => {
      try {
        const qrCodeData = "data";
        resolve(qrCodeData);
      } catch (error) {
        reject(error);
      }
    });
  };

  const handleDownloadQR = async () => {
    try {
      const qrCodeData = await convertToQRCode(paymentString);

      if (qrCodeData) {
        html2canvas(qrCodeRef.current).then((canvas) => {
          const downloadLink = document.createElement("a");
          downloadLink.href = canvas.toDataURL("image/png");
          downloadLink.download = "QR_Code.png";
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);
        });
      }
    } catch (error) {
      console.error("Failed to convert QR Code:", error);
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
        <div className="w-full border-t-2 fixed items-center bottom-0 left-0 px-4 md:px-24 bg-white z-[3000] flex gap-2 sm:justify-between md:justify-end lg:justify-end xl:justify-end">
          <div className="mr-4">
            <p className="text-xs">Total Amount</p>
            <p className="font-bold text-primary">
              {formatToCurrency(data?.data.total)}
            </p>
          </div>

          <div
            onClick={handleButtonClick}
            className="cursor-pointer sm:py-2 md:py-3 lg:py-3 xl:py-3 mr-4 my-4 border-2 border-primary text-white bg-primary px-8 rounded-md font-semibold text-sm"
          >
            Bayar Sekarang
          </div>
          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-4 rounded-md">
                <div className="w-full justify-between flex font-semibold mb-4">
                  <p>Pembayaran</p>
                  <img
                    src="../assets/png/close-icon.png"
                    onClick={handleCloseModal}
                    className="cursor-pointer"
                  />
                </div>
                <div ref={qrCodeRef} className="p-4">
                  <div className="flex items-center justify-between mb-6">
                    <img
                      src="../assets/png/QRIS_logo.png"
                      className="w-[200px]"
                    />
                    <img src="../assets/png/gpn.png" className="w-[30px] " />
                  </div>
                  <QRCode value={paymentString} size={300} />
                </div>
                <button
                  className="mt-12 px-4 py-2 bg-primary text-white rounded-md w-full"
                  onClick={handleDownloadQR}
                >
                  Download QR
                </button>
              </div>
            </div>
          )}
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
