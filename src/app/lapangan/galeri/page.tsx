/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import BannerCard from "@/app/components/cards/BannerCard";

export default function GaleriLapanganPage() {
  const title = "Fithall Kalibata";
  const icon = "../assets/png/fithall-circle.png";

  return (
    <>
      <BannerCard icon={icon} title={title} />
      <p className="my-6 font-bold">Galeri FitHall Kalibata</p>
      <div className="flex gap-6 items-center justify-center flex-wrap">
        <img src="../assets/png/contoh-list-lapangan.png" className="w-[22%]" />{" "}
        <img src="../assets/png/contoh-list-lapangan.png" className="w-[22%]" />
        <img src="../assets/png/contoh-list-lapangan.png" className="w-[22%]" />
        <img src="../assets/png/contoh-list-lapangan.png" className="w-[22%]" />
        <img src="../assets/png/contoh-list-lapangan.png" className="w-[22%]" />
        <img src="../assets/png/contoh-list-lapangan.png" className="w-[22%]" />
        <img src="../assets/png/contoh-list-lapangan.png" className="w-[22%]" />
        <img src="../assets/png/contoh-list-lapangan.png" className="w-[22%]" />
        <img src="../assets/png/contoh-list-lapangan.png" className="w-[22%]" />
        <img src="../assets/png/contoh-list-lapangan.png" className="w-[22%]" />
        <img src="../assets/png/contoh-list-lapangan.png" className="w-[22%]" />
        <img src="../assets/png/contoh-list-lapangan.png" className="w-[22%]" />
      </div>
    </>
  );
}
