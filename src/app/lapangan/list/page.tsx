/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import BannerCard from "@/app/components/cards/BannerCard";
import ListLapanganCard from "@/app/components/cards/ListLapanganCard";

export default function ListLapanganPage() {
  const title = "Fithall Kalibata";
  const icon = "../assets/png/fithall-circle.png";

  const lapanganData = [
    {
      id: 1,
      imageSrc: "../assets/png/contoh-list-lapangan.png",
      name: "Lapangan Badminton 1",
      size: "13.36 x 6.10 M",
    },
    {
      id: 2,
      imageSrc: "../assets/png/contoh-list-lapangan.png",
      name: "Lapangan Badminton 2",
      size: "14.00 x 7.00 M",
    },
    {
      id: 3,
      imageSrc: "../assets/png/contoh-list-lapangan.png",
      name: "Lapangan Tennis 1",
      size: "23.77 x 8.23 M",
    },
    {
      id: 4,
      imageSrc: "../assets/png/contoh-list-lapangan.png",
      name: "Lapangan Basketball 1",
      size: "28.00 x 15.00 M",
    },
  ];

  return (
    <>
      <BannerCard icon={icon} title={title} />
      <p className="my-6 font-bold">Lapangan Badminton</p>
      <div className="grid grid-cols-4 justify-between items-center gap-4">
        {lapanganData.map((lapangan) => (
          <ListLapanganCard
            key={lapangan.id}
            id={lapangan.id}
            imageSrc={lapangan.imageSrc}
            name={lapangan.name}
            size={lapangan.size}
          />
        ))}
      </div>

      <p className="my-6 font-bold">Lapangan Tenis</p>
      <div className="grid grid-cols-4 justify-between items-center gap-4">
        {lapanganData.map((lapangan) => (
          <ListLapanganCard
            key={lapangan.id}
            id={lapangan.id}
            imageSrc={lapangan.imageSrc}
            name={lapangan.name}
            size={lapangan.size}
          />
        ))}
      </div>
    </>
  );
}
