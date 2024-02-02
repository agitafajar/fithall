/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import CabangLapanganCard from "./CabangLapanganCard";

interface SportData {
  pic: string;
  label: string;
  location: string;
  price: string;
  time: string;
}

interface SportTrainingSectionProps {
  dataSport: SportData[];
}

const LapanganCard: React.FC<SportTrainingSectionProps> = ({ dataSport }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <p className="font-bold flex text-[22px]">
          Sport Training
          <span className="text-primary flex items-center pl-8 text-sm cursor-pointer">
            Lihat Semua
            <img
              src="./assets/png/next.png"
              width="6px"
              className="ml-1 pt-1"
            />
          </span>
        </p>
        <div className="flex gap-4">
          <img
            src="./assets/png/back-icon.png"
            width="40px"
            className="ml-1 pt-1 cursor-pointer"
          />
          <img
            src="./assets/png/next-icon.png"
            width="40px"
            className="ml-1 pt-1 cursor-pointer"
          />
        </div>
      </div>
      <div className="flex gap-6 mb-12 justify-between">
        {dataSport.map((dataList, key) => (
          <div key={key}>
            <CabangLapanganCard
              pic={dataList.pic}
              label={dataList.location}
              location={dataList.label}
              price={dataList.price}
              time={dataList.time}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LapanganCard;
