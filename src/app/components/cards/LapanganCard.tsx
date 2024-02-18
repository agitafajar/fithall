/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import CabangLapanganCard from "./CabangLapanganCard";

interface Props {
  cover_image: string;
  alamat: string;
  nama: string;
  price: string;
  waktu_buka: string;
  waktu_tutup: string;
  slug: string;
}

interface SportTrainingSectionProps {
  dataList: Props[];
}

const LapanganCard: React.FC<SportTrainingSectionProps> = ({ dataList }) => {
  return (
    <div>
      <div className="flex gap-6 mb-12 overflow-auto overflow-y-auto ">
        {dataList.map((dataList, key) => (
          <div key={key}>
            <CabangLapanganCard
              pic={dataList.cover_image}
              label={dataList.nama}
              location={dataList.alamat}
              price={dataList.price}
              openTime={dataList.waktu_buka.substring(0, 5)}
              closeTime={dataList.waktu_tutup.substring(0, 5)}
              slug={dataList.slug}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LapanganCard;
