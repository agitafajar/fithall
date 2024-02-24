/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import useGetCabang from "@/features/cabang/useGetCabang";
import ErrorPage from "../error";
import LoadingPage from "../loading";
import { useEffect, useState } from "react";
import useGetTimeslot from "@/features/cabang/useGetTimeslot";
import useGetLapangan from "@/features/cabang/useGetLapangan";
import { usePostTimeslot } from "@/features/cabang/usePostTimeslot";
import { usePostMember } from "@/features/cabang/usePostMember";
import { useRouter } from "next/navigation";
import useGetUser from "@/features/users/useGetUser";
import { MemberRulesCard } from "../components/cards/MemberRulesCard";

export default function MemberPage() {
  const [selectedDate, setSelectedDate] = useState(() => {
    const currentDate = new Date();
    return currentDate.toISOString().split("T")[0];
  });
  const [selectedCabang, setSelectedCabang] = useState<string>("");
  const [selectedLapangan, setSelectedLapangan] = useState<string>("");
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectTimeslot, setSelectTimeslot] = useState<string[]>([]);
  const [JadwalTimeSlot, setJadwalTimeSlot] = useState<[]>([]);
  const [dataTimeSlot, setDataTimeSlot] = useState<{ [key: string]: string }>(
    {}
  );
  const [totalBulan, setTotalBulan] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);
  const { data } = useGetUser();
  const isGuest = data?.data.id === 2;
  const router = useRouter();

  if (isGuest) {
    alert("Harap login terlebih dahulu");
    router.push("/");
  }

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
    setSelectedCabang("");
    setSelectedLapangan("");
    setSelectedDays([]);
    setSelectTimeslot([]);
    setJadwalTimeSlot([]);
    setDataTimeSlot({});
    refetchCabang();
  };

  const {
    data: dataCabang,
    refetch: refetchCabang,
    isLoading: isLoadingCabang,
    error,
  } = useGetCabang();

  const {
    data: dataLapangan,
    refetch: refetchDataLapangan,
    isLoading: isLoadingLapangan,
  } = useGetLapangan(selectedCabang);

  const {
    data: dataTimeslot,
    refetch: refetchTimeslot,
    isLoading: isLoadingTimeslot,
  } = useGetTimeslot(selectedLapangan, selectedDays);

  const isLoadings = isLoadingCabang || isLoadingLapangan || isLoadingTimeslot;

  const { mutate: postTimeslotMutation } = usePostTimeslot({
    onSuccess: (data) => {
      setDataTimeSlot(data.data);
    },

    onError: () => {
      console.log("error");
    },
  });

  const { mutate: postMember } = usePostMember({
    onSuccess: () => {
      router.push("/checkout");
    },

    onError: () => {
      console.log("error");
    },
  });

  const handleCheckboxChange = (value: string) => {
    const updatedSelectedDays = selectedDays.includes(value)
      ? selectedDays.filter((day) => day !== value)
      : [...selectedDays, value];

    setSelectedDays(updatedSelectedDays);
  };

  const handleCheckboxTimeslotChange = (value: string) => {
    if (dataTimeslot) {
      const updatedSelectTimeslot = selectTimeslot.includes(value)
        ? selectTimeslot.filter((day) => day !== value)
        : [...selectTimeslot, value];

      setJadwalTimeSlot(
        dataTimeslot.data
          .filter((item: any) => updatedSelectTimeslot.includes(item.id))
          .map((item: any) => ({ ...item }))
      );

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
  }, [selectedCabang, selectedDays, selectedLapangan]);

  if (isLoadings) {
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

  const checkoutMember = async () => {
    setIsLoading(true);
    try {
      postMember({
        durasi: totalBulan,
        jadwal: Array.isArray(JadwalTimeSlot)
          ? JadwalTimeSlot.map((item: any) => ({
              hari: item.hari,
              jam: item.jam,
              lapangan_id: item.lapangan_id,
            }))
          : [],
        start_member: selectedDate,
      });
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  const handleTotalBulanChange = (value: number) => {
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

      refetchTimeslot();
    }
  };
  return (
    <div className="flex justify-center w-full flex-col items-center">
      <MemberRulesCard />
      <div className="max-w-3xl">
        <p className="text-2xl font-bold pb-4 border-b-2 mb-4">
          Pendaftaran Member
        </p>
        <div className="mb-4">
          <label className="block text-sm font-bold text-gray-700">
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
          <label className="block text-sm font-bold text-gray-700">
            Cabang
          </label>
          <select
            id="cabang"
            value={selectedCabang}
            onChange={(e) => {
              const selectedSlug = e.target.value;
              setSelectedCabang(selectedSlug);
            }}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md bg-[#F0F1F5]"
          >
            <option value="">Pilih Cabang</option>
            {dataCabang?.data.map((cabang: any) => (
              <option key={cabang.id} value={cabang.slug}>
                {cabang.slug === selectedCabang ? cabang.nama : cabang.nama}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold text-gray-700">
            Lapangan
          </label>
          <select
            id="lapangan"
            value={selectedLapangan}
            onChange={(e) => {
              const selectedSlug = e.target.value;
              setSelectedLapangan(selectedSlug);
            }}
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
          <label className="block text-sm font-bold text-gray-700">
            Pilih Hari
          </label>
          <div className="grid grid-cols-4 w-[750px] gap-4">
            {daysOptions.map((day) => (
              <div key={day.value} className="flex items-center">
                <input
                  type="checkbox"
                  id={`day-${day.value}`}
                  value={day.value}
                  checked={selectedDays.includes(day.value)}
                  onChange={() => handleCheckboxChange(day.value)}
                  className="mr-2 h-4 w-4"
                  disabled={!selectedCabang || selectedLapangan.length === 0}
                />
                <label
                  htmlFor={`day-${day.value}`}
                  className={`text-gray-700 ${
                    !selectedCabang ? "text-gray-400" : ""
                  }`}
                >
                  {day.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700">
            Pilih Jadwal
          </label>
          <div className="mb-4 bg-[#F0F1F5]">
            {!selectedCabang ||
            !selectedLapangan ||
            selectedDays.length === 0 ? (
              <>
                <p className="p-2 rounded-xl font-bold">
                  Silahkan pilih hari terlebih dahulu
                </p>
              </>
            ) : (
              <>
                {dataTimeslot?.data.map((day: any) => (
                  <div
                    key={day.id}
                    className="flex items-center justify-center px-2"
                  >
                    <input
                      type="checkbox"
                      value={day.id}
                      checked={selectTimeslot.includes(day.id)}
                      onChange={() => handleCheckboxTimeslotChange(day.id)}
                      className="w-6 h-6"
                    />
                    <div className="p-2 block w-full rounded-md">
                      {day.full_name}
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
        <div>
          <label
            htmlFor="bulan"
            className="block text-sm font-bold text-gray-700"
          >
            Total Bulan
          </label>
          <div className="mb-4 flex gap-6 mt-2">
            <div className="flex gap-1">
              <input
                id="bulan"
                defaultChecked
                type="radio"
                name="bulan"
                value={1}
                onChange={() => handleTotalBulanChange(1)}
              />
              <label>1 Bulan</label>
            </div>
            <div className="flex gap-1">
              <input
                type="radio"
                name="bulan"
                value={2}
                onChange={() => handleTotalBulanChange(2)}
              />
              <label>2 Bulan</label>
            </div>
            <div className="flex gap-1">
              <input
                type="radio"
                name="bulan"
                value={3}
                onChange={() => handleTotalBulanChange(3)}
              />
              <label>3 Bulan</label>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-6 mb-6">
          {Object.keys(dataTimeSlot).map((date) => {
            const [day, month, year, time] = date.split(" ");
            const formattedDate = `${day} ${month} ${year}`;
            const formattedTime = time;
            const isTrue = dataTimeSlot[date];

            return (
              <div
                key={date}
                className={`py-3 flex flex-col items-center justify-center font-bold border-2 rounded-lg ${
                  isTrue ? "bg-white" : "bg-[#F79B9B]"
                }`}
              >
                <p className="mb-2">{formattedDate}</p>
                <p className="text-primary ">{formattedTime}</p>
              </div>
            );
          })}
        </div>

        <div>
          <p
            className="w-full py-4 bg-primary text-white text-center rounded-lg cursor-pointer"
            onClick={checkoutMember}
          >
            {isLoading ? "Submitting..." : "Daftar Member"}
          </p>
        </div>
      </div>
    </div>
  );
}
