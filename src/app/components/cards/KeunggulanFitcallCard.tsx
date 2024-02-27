/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
export default function KeunggulanFitcallCard() {
  return (
    <div className="mb-12">
      <p className="font-bold flex mb-4 text-2xl">Keunggulan Fithall</p>
      <div className=" text-center gap-6 sm:flex sm:flex-col md:grid lg:grid xl:grid md:grid-cols-2 lg:grid-cols-4  xl:grid-cols-4 ">
        <div className="p-4 flex flex-col gap-6 px-8 rounded-xl justify-center items-center border-2">
          <img src="../assets/svg/img_keunggulan-1.svg" className="ml-1 pt-1" />
          <p className="font-bold text-xl">Fasilitas Pilihan</p>
          <p className="text-[##323F4B]">
            Nikmati Keunggulan Booking dengan Fasilitas Sesuai Pilihanmu
          </p>
        </div>
        <div className="p-4 flex flex-col gap-6 px-8 rounded-xl justify-center items-center border-2">
          <img src="../assets/svg/img_keunggulan-2.svg" className="ml-1 pt-1" />
          <p className="font-bold text-xl">Ragam Aktivitas</p>
          <p className="text-[##323F4B]">
            Temukan Kesenangan Berlimpah dengan Berbagai Pilihan Aktivitas
          </p>
        </div>
        <div className="p-4 flex flex-col gap-6 px-8 rounded-xl justify-center items-center border-2">
          <img src="../assets/svg/img_keunggulan-3.svg" className="ml-1 pt-1" />
          <p className="font-bold text-xl">Jaringan Pelatih</p>
          <p className="text-[##323F4B]">
            Raih Performa Optimal dengan Akses ke Jaringan Pelatih Olahraga
          </p>
        </div>
        <div className="p-4 flex flex-col gap-6 px-8 rounded-xl justify-center items-center border-2">
          <img src="../assets/svg/img_keunggulan-4.svg" className="ml-1 pt-1" />
          <p className="font-bold text-xl">Pembayaran Digital</p>
          <p className="text-[##323F4B]">
            Mudah, Cepat, Aman. Nikmati Keunggulan Pembayaran Digital
          </p>
        </div>
      </div>
    </div>
  );
}
