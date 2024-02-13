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
  const [dataTimeSlot, setDataTimeSlot] = useState<{ [key: string]: string }>(
    {}
  );
  const [totalBulan, setTotalBulan] = useState<number>(1);

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
    onSuccess: (data) => {
      setDataTimeSlot(data.data);
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
      const updatedSelectTimeslot = selectTimeslot.includes(value)
        ? selectTimeslot.filter((day) => day !== value)
        : [...selectTimeslot, value];

      postTimeslotMutation({
        timeslots: dataTimeslot.data
          .filter((item: any) => updatedSelectTimeslot.includes(item.id))
          .map((item: any) => ({ ...item })),
        tanggal_awal: selectedDate,
        durasi: totalBulan,
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
    { value: "0", label: "Minggu" },
    { value: "1", label: "Senin" },
    { value: "2", label: "Selasa" },
    { value: "3", label: "Rabu" },
    { value: "4", label: "Kamis" },
    { value: "5", label: "Jumat" },
    { value: "6", label: "Sabtu" },
  ];

  console.log("dataTimeSlot", dataTimeSlot);
  const handleTotalBulanChange = (value: number) => {
    // Lakukan apa pun yang perlu dilakukan ketika radio button berubah
    setTotalBulan(value);

    if (dataTimeslot && selectTimeslot.length > 0) {
      const updatedSelectTimeslot = selectTimeslot;

      postTimeslotMutation({
        timeslots: dataTimeslot.data
          .filter((item: any) => updatedSelectTimeslot.includes(item.id))
          .map((item: any) => ({ ...item })),
        tanggal_awal: selectedDate,
        durasi: value,
      });

      refetchTimeslot(); // Untuk melakukan pengiriman ulang timeslot setelah perubahan durasi
    }
  };

  return (
    <div className="flex justify-center w-full">
      <div className="max-w-3xl ">
        member
        <div className="mb-4">
          <label
            htmlFor="nama"
            className="block text-sm font-bold text-gray-700"
          >
            Mulai Book
          </label>
          <input
            type="date"
            id="dateFilter"
            value={selectedDate}
            onChange={handleDateChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md bg-[#F0F1F5]"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="nama"
            className="block text-sm font-bold text-gray-700"
          >
            Cabang
          </label>
          <select
            value={selectedCabang}
            onChange={handleCabangChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md bg-[#F0F1F5]"
          >
            <option value="">Pilih Cabang</option>
            {dataCabang?.data.map((cabang: any) => (
              <option key={cabang.id} value={cabang.slug}>
                {cabang.nama}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="nama"
            className="block text-sm font-bold text-gray-700"
          >
            Lapangan
          </label>
          <select
            value={selectedLapangan}
            onChange={handleLapanganChange}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md bg-[#F0F1F5]"
          >
            <option value="">Pilih Lapangan</option>
            {dataLapangan?.data?.lapangan?.map((lapangan: any) => (
              <option key={lapangan.id} value={lapangan.id}>
                {lapangan.full_name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="nama"
            className="block text-sm font-bold text-gray-700"
          >
            Hari
          </label>
          <div className="flex justify-between">
            {daysOptions.map((day) => (
              <div
                key={day.value}
                id={`day-${day.value}`}
                onClick={() => handleCheckboxChange(day.value)}
                className={`cursor-pointer ${
                  selectedDays.includes(day.value) ? "bg-[#D0FBF0]" : "bg-white"
                } p-2 mr-2 mt-1 w-[130px] text-center border-2 rounded-xl`}
              >
                {day.label}
              </div>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="nama"
            className="block text-sm font-bold text-gray-700"
          >
            Jadwal
          </label>
          {dataTimeslot?.data.map((day: any) => (
            <div key={day.id} className="flex items-center">
              <input
                type="checkbox"
                id={`day-${day.id}`}
                value={day.id}
                checked={selectTimeslot.includes(day.id)}
                onChange={() => handleCheckboxTimeslotChange(day.id)}
              />
              <div className="mt-1 p-2 block w-full border border-gray-300 rounded-md bg-[#F0F1F5]">
                {day.full_name}
              </div>
            </div>
          ))}
        </div>
        <div className="mb-4">
          <label
            htmlFor="nama"
            className="block text-sm font-bold text-gray-700"
          >
            Total Bulan
          </label>
          <input
            defaultChecked
            type="radio"
            name="bulan"
            value={1}
            onChange={() => handleTotalBulanChange(1)}
          />
          <label>1 Bulan</label>

          <input
            type="radio"
            name="bulan"
            value={2}
            onChange={() => handleTotalBulanChange(2)}
          />
          <label>2 Bulan</label>

          <input
            type="radio"
            name="bulan"
            value={3}
            onChange={() => handleTotalBulanChange(3)}
          />
          <label>3 Bulan</label>
        </div>
        <div className="flex gap-6">
          {Object.keys(dataTimeSlot).map((date) => (
            <div key={date}>
              <p>{date}</p>
            </div>
          ))}
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
    </div>
  );
}
