/* eslint-disable @next/next/no-img-element */
import React from "react";

type LapanganCardProps = {
  id: number;
  imageSrc: string;
  name: string;
  size: string;
};

const ListLapanganCard: React.FC<LapanganCardProps> = ({
  imageSrc,
  name,
  size,
}) => {
  return (
    <div className="rounded-xl p-4 border-2 p-4 gap-3 flex flex-col">
      <img src={imageSrc} alt={name} width="100%" />
      <p className="text-lg font-bold">{name}</p>
      <p className="font-bold text-sm text-[#7B8794]">{size}</p>
      <div className="bg-primary rounded-lg text-center text-white py-4 md:py-3 md:text-sm md:mt-2 cursor-pointer">
        Book Jadwal
      </div>
    </div>
  );
};

export default ListLapanganCard;
