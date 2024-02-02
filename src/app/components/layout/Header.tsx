/* eslint-disable @next/next/no-img-element */
"use client";

import { routeConfig } from "@/routes/routeConfig";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function Header() {
  const currentPath = usePathname();

  return (
    <div className="flex font-plus-jakarta-sans justify-between px-24 items-center border-b-2 mb-12 sticky top-0 bg-white z-20">
      <Link href="/">
        <img
          src="../assets/png/fithall-logo.png"
          className="w-[125px] md:w-[100px]"
          alt="fithall-logo"
        />
      </Link>
      <div className="flex items-center">
        {routeConfig.map((route, key) => {
          const isActive =
            currentPath === route.path ||
            currentPath.startsWith(route.path + "/");
          return (
            <React.Fragment key={key}>
              <Link href={route.path}>
                <p
                  className={` ${
                    isActive ? "border-b-primary " : "border-b-white"
                  } mr-10 border border-b-[5px] py-6 font-semibold text-[#2B2B2B] border-t-white border-l-white border-r-white`}
                >
                  {route.label}
                </p>
              </Link>
            </React.Fragment>
          );
        })}

        <div className="cursor-pointer mr-4 border-2 border-primary py-2 text-primary px-8 rounded-md font-semibold text-sm flex gap-1">
          <img src="../assets/png/cart-icon.png" width="20px" alt="cart-icon" />
          <p>Cart</p>
        </div>
        <div className="cursor-pointer mr-4 border-2 border-primary py-2 text-white bg-primary px-8 rounded-md font-semibold text-sm">
          Login
        </div>
      </div>
    </div>
  );
}
