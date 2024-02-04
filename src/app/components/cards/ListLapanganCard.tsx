/* eslint-disable @next/next/no-img-element */
"use client ";

import React from "react";

type LapanganCardProps = {
  id: number;
  imageSrc: string;
  name: string;
  size: string;
};

export default function FilterCard(props: LapanganCardProps) {
  const { size, imageSrc, name } = props;

  return (
    <div className="rounded-xl border-2 p-4 gap-3 flex flex-col">
      <img src={imageSrc} alt={name} className="w-full h-[350px] rounded-xl" />
      <p className="text-lg font-bold">{name}</p>
      <p className="font-bold text-sm text-[#7B8794]">{size}</p>
      <div className="bg-primary rounded-lg text-center text-white py-4 md:py-3 md:text-sm md:mt-2 cursor-pointer">
        Book Jadwal
      </div>
    </div>
  );
}
