/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
"use client";

import { routeConfig } from "@/routes/routeConfig";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import LoginModal from "../modal/LoginModal";
import RegisterModal from "../modal/RegisterModal";
import useGetUser from "@/features/users/useGetUser";

export default function Header() {
  const isGuest = localStorage.getItem("is-guest");
  const currentPath = usePathname();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isProfileVisible, setProfileVisibility] = useState(false);
  const { data } = useGetUser();

  const openLoginModal = () => {
    closeRegisterModal();
    setIsLoginModalOpen(true);
  };
  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };
  const openRegisterModal = () => {
    closeLoginModal();
    setIsRegisterModalOpen(true);
  };
  const closeRegisterModal = () => {
    setIsRegisterModalOpen(false);
  };

  const handleProfileClick = () => {
    setProfileVisibility(!isProfileVisible);
  };

  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="flex font-plus-jakarta-sans justify-between px-24 items-center border-b-2 mb-12 sticky top-0 bg-white z-50">
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

        <div className=" border-r-2 mr-4">
          <div className="p-3 bg-[#F5F7FA] rounded-full mr-4">
            <img src="../assets/png/shopping-cart.png" />
          </div>
        </div>

        {!isGuest ? (
          <div
            className="cursor-pointer mr-4 border-2 border-primary py-2 text-white bg-primary px-8 rounded-md font-semibold text-sm"
            onClick={openLoginModal}
          >
            Login
          </div>
        ) : (
          <div className="flex gap-1">
            <div className="p-3 bg-[#F5F7FA] rounded-full mr-4">
              <img src="../assets/png/profile.png" />
            </div>
            <div
              className="flex flex-col gap cursor-pointer"
              onClick={handleProfileClick}
            >
              <p className="-mb-1 text-sm">Hello</p>
              <p className="font-bold">
                {" "}
                {data?.data.name.length > 10
                  ? `${data?.data.name.substring(0, 11)}...`
                  : data?.data.name}
              </p>
            </div>
            {isProfileVisible && (
              <div className="bg-white text-xs border-2 p-4 rounded-xl absolute top-[70px] right-24 z-0">
                <p>
                  Welcome, <span className="font-bold">{data?.data.name}</span>
                </p>
                <p className="border-b-2 mb-4 pb-1">{data?.data.email}</p>
                <p
                  className="font-bold text-sm cursor-pointer"
                  onClick={logout}
                >
                  Logout
                </p>
              </div>
            )}
          </div>
        )}

        {isLoginModalOpen && (
          <LoginModal
            closeModal={closeLoginModal}
            registerModal={openRegisterModal}
          />
        )}

        {isRegisterModalOpen && (
          <RegisterModal
            closeModal={closeRegisterModal}
            loginModal={openLoginModal}
          />
        )}
      </div>
    </div>
  );
}
