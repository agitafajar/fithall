/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client ";

import FilterBannerCard from "./FilterBannerCard";

type BannerCardProps = {
  icon: string;
  title: string;
};

const BannerCard: React.FC<BannerCardProps> = ({ icon, title }) => {
  return (
    <>
      <div className="w-full flex flex-col items-center justify-center h-[330px] mb-12">
        <div
          className="flex justify-center relative bg-cover bg-center w-full h-full rounded-3xl items-center p-24 -mb-12"
          style={{ backgroundImage: "url('../assets/png/home-banner.png')" }}
        >
          <div className="flex flex-col justify-center items-center relative z-10">
            <img src={icon} className="font-bold text-white mb-4" />
            <p className="font-bold text-4xl md:text-4xl text-white mb-6 capitalize">
              {title}
            </p>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent rounded-3xl"></div>
        </div>

        <div className="flex justify-between max-w-4xl shadow-md p-6 rounded-lg gap-6 z-10 bg-white">
          <FilterBannerCard />
        </div>
      </div>
    </>
  );
};

export default BannerCard;
