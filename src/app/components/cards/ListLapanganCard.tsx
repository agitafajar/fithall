/* eslint-disable @next/next/no-img-element */
"use client ";

import Link from "next/link";
import React from "react";

type LapanganCardProps = {
  id: number;
  imageSrc: string;
  name: string;
  size: string;
  slug: string;
};

export default function FilterCard(props: LapanganCardProps) {
  const { size, imageSrc, name, slug, id } = props;

  return (
    <div className="rounded-xl border-2 p-4 gap-3 flex flex-col w-full sm:h-[550px] md:h-[560px] lg:h-[560px] xl:h-[560px] ">
      <img src={imageSrc} alt={name} className="w-full h-[350px] rounded-xl" />
      <p className="text-lg font-bold">{name}</p>
      <p className="font-bold text-sm text-[#7B8794]">{size}</p>
      <Link
        href={`/booking/${slug}?id=${id}`}
        className="bg-primary rounded-lg text-center text-white py-4 md:py-3 md:text-sm md:mt-2 cursor-pointer"
      >
        Book Jadwal
      </Link>
    </div>
  );
}
