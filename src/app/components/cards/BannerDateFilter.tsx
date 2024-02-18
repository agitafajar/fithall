/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";

interface DateFilterProps {
  selectedDate: string;
  onDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  title: string;
}

const DateFilter: React.FC<DateFilterProps> = ({
  selectedDate,
  onDateChange,
  title,
}) => {
  return (
    <div className="w-full flex flex-col items-center justify-center h-[330px] mb-12 text-white">
      <div
        className="flex justify-center relative bg-cover bg-center w-full h-full rounded-3xl items-center p-24 -mb-12"
        style={{ backgroundImage: "url('../assets/png/home-banner.png')" }}
      >
        <div className="flex flex-col justify-center items-center relative z-10 mt-24 ">
          <p className="font-bold sm:text-3xl md:text-4xl lg:text-4xl xl:text-4xl text-4xl text-white mb-6 capitalize">
            {title}
          </p>
          <div className="text-left">
            <p className="text-xs mb-2">Pilih Tanggal Booking</p>
            <input
              type="date"
              id="dateFilter"
              value={selectedDate}
              onChange={onDateChange}
              className="p-3 text-black rounded-lg mb-4  sm:w-[300px] md:w-[500px] lg:w-[500px] xl:w-[500px]"
            />
          </div>
          <p className="text-sm font-bold">Note - Pilih Jadwal Di Bawah Ini</p>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent rounded-3xl"></div>
      </div>
    </div>
  );
};

export default DateFilter;
