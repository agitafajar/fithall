/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function FilterBannerCard() {
  const currentPath = usePathname(); // Assuming usePathname is a custom hook that returns the current pathname

  const dataFilter = [
    {
      id: "1",
      title: "List Lapangan",
      icon: "../assets/png/location.png",
      href: "/lapangan/list",
    },
    {
      id: "2",
      title: "About Lapangan",
      icon: "../assets/png/store.png",
      href: "/lapangan/about",
    },
    {
      id: "3",
      title: "Galeri Lapangan",
      icon: "../assets/png/calendar.png",
      href: "/lapangan/galeri",
    },
  ];

  return (
    <>
      <div className="flex items-center gap-2">
        {dataFilter.map((dataList, index) => (
          <Link href={dataList.href} key={index}>
            <div
              className={`flex items-center gap-2 px-12 ${
                currentPath.startsWith(dataList.href)
                  ? " text-[#0C8C6B] font-bold"
                  : "font-bold"
              } ${
                index === dataFilter.length - 1
                  ? "border-r-1 mr-[-12px]"
                  : "border-r-2"
              } cursor-pointer`}
            >
              <img src={dataList.icon} alt="" width="20px" height="20px" />
              <p className="font-bold">{dataList.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
