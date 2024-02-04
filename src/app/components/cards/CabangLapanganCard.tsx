/* eslint-disable @next/next/no-img-element */
"use client ";

import Link from "next/link";

type Props = {
  pic: string;
  label: string;
  location: string;
  price: string;
  openTime: string;
  closeTime: string;
};
export default function CabangLapanganCard(props: Props) {
  const { pic, label, location, price, openTime, closeTime } = props;

  return (
    <>
      <Link
        href="/lapangan/list"
        className="flex flex-col p-4 border-2 rounded-xl gap-4 cursor-pointer w-[320px]"
      >
        <img src={pic} alt="" className=" w-full h-[200px] rounded-lg" />
        <p className="font-bold">{label}</p>
        <div className="flex items-center gap-2 text-xs font-semibold text-[#808080]">
          <img src="../assets/png/location.png" alt="" width="15px" />
          <p>{location}</p>
        </div>
        <div className="flex justify-between items-end">
          <div>
            <p className="text-xs">Mulai dari</p>
            <p className="text-md font-bold text-primary">{price}</p>
          </div>
          <div className="text-xs text-[#808080] flex">
            <p className="mr-1">{openTime}</p> -{" "}
            <p className="ml-1">{closeTime}</p>
          </div>
        </div>
      </Link>
    </>
  );
}
