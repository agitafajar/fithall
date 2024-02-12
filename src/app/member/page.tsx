"use client";

import useGetCabang from "@/features/cabang/useGetCabang";
import ErrorPage from "../error";
import LoadingPage from "../loading";
import { useEffect, useState } from "react";
import useGetTimeslot from "@/features/cabang/useGetTimeslot";
import useGetLapangan from "@/features/cabang/useGetLapangan";
import { usePostTimeslot } from "@/features/cabang/usePostTimeslot";

export default function MemberPage() {
  const [selectedDate, setSelectedDate] = useState(() => {
    const currentDate = new Date();
    return currentDate.toISOString().split("T")[0];
  });
  const [selectedCabang, setSelectedCabang] = useState("");
  const [selectedLapangan, setSelectedLapangan] = useState("");
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectTimeslot, setSelectTimeslot] = useState<string[]>([]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
    refetchCabang();
  };

  const {
    data: dataCabang,
    refetch: refetchCabang,
    isLoading,
    error,
  } = useGetCabang();

  const { data: dataLapangan, refetch: refetchDataLapangan } =
    useGetLapangan(selectedCabang);

  const { data: dataTimeslot, refetch: refetchTimeslot } = useGetTimeslot(
    selectedLapangan,
    selectedDays
  );

  const { mutate: postTimeslotMutation } = usePostTimeslot({
    onSuccess: (response) => {
      console.log("Success:", response);
      // Do something with the success response
    },

    onError: () => {
      console.log("error");
    },
  });

  const selectedCabangData = dataTimeslot?.data.find(
    (lapangan: any) => lapangan.id === selectedLapangan
  );

  const handleCabangChange = (e: any) => {
    setSelectedCabang(e.target.value);
    refetchDataLapangan();
  };

  const handleLapanganChange = (e: any) => {
    setSelectedLapangan(e.target.value);
  };

  const handleCheckboxChange = (value: string) => {
    const updatedSelectedDays = selectedDays.includes(value)
      ? selectedDays.filter((day) => day !== value)
      : [...selectedDays, value];

    setSelectedDays(updatedSelectedDays);
    refetchTimeslot();
  };

  const handleCheckboxTimeslotChange = (value: string) => {
    if (dataTimeslot) {
      // Toggle the selected state for the clicked item
      const updatedSelectTimeslot = selectTimeslot.includes(value)
        ? selectTimeslot.filter((day) => day !== value)
        : [...selectTimeslot, value];

      console.log("Updated selectTimeslot:", updatedSelectTimeslot);
      // Do something with updatedSelectTimeslot

      postTimeslotMutation({
        timeslots: dataTimeslot.data
          .filter((item: any) => updatedSelectTimeslot.includes(item.id))
          .map((item: any) => ({ ...item })),
        tanggal_awal: selectedDate,
        durasi: 1,
      });

      setSelectTimeslot(updatedSelectTimeslot);
      refetchTimeslot();
    }
  };

  useEffect(() => {
    refetchDataLapangan();
    refetchTimeslot();
  }, [
    refetchDataLapangan,
    refetchTimeslot,
    selectedCabang,
    selectedLapangan,
    selectedDays,
    selectTimeslot,
  ]);

  console.log("selectedDate", selectedDate);
  console.log("selectedDays", selectedDays);
  console.log("selectTimeslot", selectTimeslot);

  if (isLoading) {
    return (
      <div>
        <LoadingPage />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <ErrorPage />
      </div>
    );
  }

  const daysOptions = [
    { value: "0", label: "Hari Minggu" },
    { value: "1", label: "Hari Senin" },
    { value: "2", label: "Hari Selasa" },
    { value: "3", label: "Hari Rabu" },
    { value: "4", label: "Hari Kamis" },
    { value: "5", label: "Hari Jumat" },
    { value: "6", label: "Hari Sabtu" },
  ];

  return (
    <div>
      member
      <div className="text-left">
        <p className="text-xs mb-2">Pilih Tanggal Booking</p>
        <input
          type="date"
          id="dateFilter"
          value={selectedDate}
          onChange={handleDateChange}
          className="p-3 text-black rounded-lg mb-4 w-[500px]"
        />
      </div>
      <div className="mb-12">
        <select
          value={selectedCabang}
          onChange={handleCabangChange}
          className="block w-full px-4 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-gray-500 focus:outline-none focus:ring"
        >
          <option value="">Pilih Cabang</option>
          {dataCabang?.data.map((cabang: any) => (
            <option key={cabang.id} value={cabang.slug}>
              {cabang.nama}
            </option>
          ))}
        </select>
      </div>
      <div>
        <select
          value={selectedLapangan}
          onChange={handleLapanganChange}
          className="block w-full px-4 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-gray-500 focus:outline-none focus:ring"
        >
          <option value="">Pilih Lapangan</option>
          {dataLapangan?.data?.lapangan?.map((lapangan: any) => (
            <option key={lapangan.id} value={lapangan.id}>
              {lapangan.full_name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <div className="mt-6">
          {daysOptions.map((day) => (
            <div key={day.value} className="flex items-center">
              <input
                type="checkbox"
                id={`day-${day.value}`}
                value={day.value}
                checked={selectedDays.includes(day.value)}
                onChange={() => handleCheckboxChange(day.value)}
                className="mr-2"
              />
              <label htmlFor={`day-${day.value}`}>{day.label}</label>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="mt-6">
          {dataTimeslot?.data.map((day: any) => (
            <div key={day.id} className="flex items-center">
              <input
                type="checkbox"
                id={`day-${day.id}`}
                value={day.id}
                checked={selectTimeslot.includes(day.id)}
                onChange={() => handleCheckboxTimeslotChange(day.id)}
                className="mr-2"
              />
              <label htmlFor={`day-${day.id}`}>{day.full_name}</label>
            </div>
          ))}
        </div>
      </div>
      {/* <div>
        {dataTimeslot?.data.map((index: any) => {
          return (
            <div key={index.id} className="flex flex-col">
              {index.full_name}
            </div>
          );
        })}
      </div> */}
    </div>
  );
}
