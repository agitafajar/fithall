/* eslint-disable jsx-a11y/alt-text */
import FilterCard from "./components/cards/FilterCards";

/* eslint-disable @next/next/no-img-element */
export default function Home() {
  const dataFilter = [
    {
      title: "Location",
      desc: "Lokasi lapangan",
      icon: "./assets/png/location.png",
    },
    {
      title: "Field Type",
      desc: "Tipe lapangan",
      icon: "./assets/png/store.png",
    },
    {
      title: "Date",
      desc: "Pilih Tanggal",
      icon: "./assets/png/calendar.png",
    },
  ];

  return (
    <main>
      <div className="w-full flex flex-col items-center justify-center h-[450px] mb-12">
        <div
          className="relative bg-cover bg-center w-full h-full rounded-3xl items-center p-24 -mb-12"
          style={{ backgroundImage: "url('./assets/png/home-banner.png')" }}
        >
          <div className="w-[30%] relative z-10">
            <p className="font-bold text-5xl text-white mb-6">
              Pesan Lapangan, Main Tanpa Ribet!
            </p>
            <p className="font-bold text-white">
              Segera Temukan dan Booking di Sini.
            </p>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent rounded-3xl"></div>
        </div>

        <div className="flex justify-between max-w-4xl shadow-md p-6 rounded-lg gap-6 z-10 bg-white">
          {dataFilter.map((listData, key) => {
            return (
              <>
                <div key={key}></div>
                <FilterCard
                  desc={listData.desc}
                  icon={listData.icon}
                  title={listData.title}
                />
              </>
            );
          })}
          <div className="flex gap-2 cursor-pointer mr-4 items-center border-2 border-primary py-2 text-white bg-primary px-12 rounded-md font-semibold text-sm">
            <p>Search</p>
            <img src="./assets/png/search.png" width="18px" alt="cart-icon" />
          </div>
        </div>
      </div>
      <div>
        <div className="flex justify-between items-center mb-4">
          <p className="font-bold flex">
            Recommended Playing Field
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
        <div>cek</div>
      </div>
    </main>
  );
}
