/* eslint-disable @next/next/no-img-element */
"use client ";

type Props = {
  pic: string;
  label: string;
  location: string;
  price: string;
  time: string;
};
export default function CabangLapanganCard(props: Props) {
  const { pic, label, location, price, time } = props;

  return (
    <>
      <div className="flex flex-col p-4 border-2 rounded-xl gap-4">
        <img src={pic} alt="" width="full" />
        <p className="font-bold">{label}</p>
        <div className="flex items-center gap-2 text-xs font-semibold text-[#808080]">
          <img src="./assets/png/location.png" alt="" width="15px" />
          <p>{location}</p>
        </div>
        <div className="flex justify-between items-end">
          <div>
            <p className="text-xs">Mulai dari</p>
            <p className="text-md font-bold text-primary">{price}</p>
          </div>
          <p className="text-xs text-[#808080]">{time}</p>
        </div>
      </div>
    </>
  );
}
