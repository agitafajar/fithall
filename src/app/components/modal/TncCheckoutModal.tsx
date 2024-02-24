/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TncCheckoutModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="absolute w-full h-full bg-gray-900 opacity-50"></div>
          <div className="bg-white mt-24 p-8 rounded shadow-md z-10 overflow-y-auto h-[550px] max-w-6xl">
            <div className="flex justify-between w-full items-center">
              <p className="mb-6 font-bold text-xl w-full">Tata Tertib</p>
              <img
                src="../assets/png/close-icon.png"
                className="cursor-pointer"
                onClick={onClose}
              />
            </div>
            <p className="text-primary font-bold text-xl text-center mb-4">
              GOR Badminton Fithall Event and Space Studio
            </p>
            <div className="leading-7">
              <ol className="list-decimal pl-6">
                <li>
                  Pembayaran lapangan dilakukan paling lambat 15 menit setelah
                  reservasi dilakukan dengan pembayaran full. Jika lebih dari 15
                  menit tidak ada pembayaran, maka reservasi akan batal
                  otomatis.
                </li>
                <li>
                  Apabila pembayaran dilakukan lebih dari 15 menit. Maka tidak
                  akan ada pengembalian uang. Dan jadwal yang dipilih tidak akan
                  terbooking.
                </li>
                <li>
                  Invoice waiting list akan di pisahkan dengan invoice lainnya.
                </li>
                <li>Berlaku biaya progressive waiting list sebagai berikut:</li>
                <ul className="list-disc pl-6">
                  <li>Waiting list 1 - 5: Kenaikan 10%</li>
                  <li>Waiting list 6 - 8: Kenaikan 15%</li>
                  <li>Waiting list 9: Kenaikan 20%</li>
                </ul>
                <li>Penyewa diwajibkan hadir tepat waktu sesuai jadwal</li>
                <li>Pengguna lapangan tidak boleh melebihi batas waktu</li>
                <li>Satu lapangan maksimal 10 pemain</li>
                <li>
                  Perpanjangan waktu dan pemakaian lapangan diperbolehkan selama
                  ada jam kosong berikutnya dengan melakukan booking ulang pada
                  website.
                </li>
                <li>
                  Apabila penyewa tidak hadir pada hari dan jam yang telah
                  terjadwal, tidak ada pergantian waktu dan uang.
                </li>
                <li>
                  Penyewa bersedia dipindah jadwalkan ke hari dan jam yang lain
                  apabila lapangan akan digunakan untuk Tournament atau acara
                  lainnya.
                </li>
                <li>
                  Operational
                  <span className="text-primary font-bold">
                    Gor Badminton Fithall Event Space and Studio
                  </span>
                  tetap buka pada hari libur nasional (tanggal merah), kecuali
                  hari raya Idul Fitri, dan Idul Adha. Oleh sebab itu, Member
                  <span className="text-primary font-bold">
                    Gor Badminton Fithall Event Space and Studio
                  </span>
                  yang terjadwal tepat pada hari merah tidak dapat dipindah
                  jadwalkan, dan tetap dihitung sebagai jadwal main.
                </li>
                <li>
                  Lampu yang digunakan/dinyalakan sesuai dengan lapangan yang di
                  sewa
                </li>
              </ol>
              <ol className="list-decimal pl-6">
                <p className="font-bold my-4">Ketentuan Pakaian & Peralatan</p>
                <li>
                  Penyewa wajib menggunakan sepatu badminton (non maker sole).
                  Jika tidak menggunakan sepatu badminton, wajib menyewa sepatu
                  di manajemen GOR Badminton Fithall Event Space & Studio
                  sebesar Rp. 15.000/jam
                </li>
                <li>Penyewa wajib menggunakan pakaian olahraga</li>
              </ol>
              <ol className="list-decimal pl-6">
                <p className="font-bold my-4">
                  Kewajiban & Tanggungjawab Penyewa
                </p>
                <li>Penyewa tidak mengganggu penyewa lainnya</li>
                <li>
                  Penyewa wajib ikut serta dalam memelihara kebersihan,
                  kenyamanan dan keamanan bersama.
                </li>
                <li>
                  Manajemen tidak bertanggung jawab atas kehilangan maupun
                  kerusakan barang-barang milik penyewa maupun barang yang
                  tertinggal.
                </li>
                <li>
                  PenManajemen tidak bertanggung jawab atas kondisi kesehatan
                  dan keselamatan penyewa
                </li>
              </ol>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TncCheckoutModal;
