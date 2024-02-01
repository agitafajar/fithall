"use client";

import { routeConfig } from "@/routes/routeConfig";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function Header() {
  const currentPath = usePathname();

  return (
    <div className="flex">
      {routeConfig.map((route, key) => {
        const isActive =
          currentPath === route.path ||
          currentPath.startsWith(route.path + "/");

        return (
          <React.Fragment key={key}>
            <Link href={route.path}>
              <p className={` ${isActive ? "bg-red-300" : "bg-white"} mr-4`}>
                {route.label}
              </p>
            </Link>
          </React.Fragment>
        );
      })}
    </div>
  );
}
