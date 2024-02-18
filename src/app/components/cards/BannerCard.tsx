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
      <div className="w-full flex flex-col items-center justify-center sm:h-[300px] md:h-[330px] lg:h-[330px] xl:h-[330px] mb-12">
        <div
          className="flex justify-center relative bg-cover bg-center w-full h-full rounded-3xl items-center sm:mb-0 md:-mb-12 lg:-mb-12 xl:-mb-12 sm:p-0 md:p-24 lg:p-24 xl:p-24"
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
      </div>
    </>
  );
};

export default BannerCard;
