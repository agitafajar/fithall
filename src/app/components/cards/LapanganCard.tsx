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
      <div className="flex gap-6 mb-12">
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
