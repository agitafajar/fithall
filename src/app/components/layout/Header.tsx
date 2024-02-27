/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
"use client";

import { routeConfig } from "@/routes/routeConfig";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import LoginModal from "../modal/LoginModal";
import RegisterModal from "../modal/RegisterModal";
import useGetUser from "@/features/users/useGetUser";
import useGetCart from "@/features/cabang/useGetCart";
import Sidebar from "./Sidebar";

export default function Header() {
  const currentPath = usePathname();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isProfileVisible, setProfileVisibility] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { data: dataCart, refetch: refetchDataCart } = useGetCart();
  const { data } = useGetUser();

  const isGuest = data?.data.id === 2;

  const totalCart = dataCart?.data?.cart.length || "";

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

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

  useEffect(() => {
    refetchDataCart();
    if (isGuest) {
      console.log(isGuest);
    }
  }, [isGuest, refetchDataCart]);

  return (
    <div className="flex font-plus-jakarta-sans justify-between sm:px-4 md:px-24 lg:px-24 xl:px-24 items-center border-b-2 sm:mb-2 md:mb-12 lg:mb-12 xl:mb-12 sticky top-0 bg-white z-50">
      <Link href="/">
        <img
          src="../assets/png/fithall-logo.png"
          className="sm:w-[80px] md:w-[100px] lg:w-[100px] xl:w-[100px] sm:my-2 md:my-4 lg:my-4 xl:my-4"
          alt="fithall-logo"
        />
      </Link>

      <div className="sm:flex md:hidden lg:hidden xl:hidden">
        <Link href="/pesanan" className="relative">
          <div className="p-3 bg-[#F5F7FA] rounded-full mr-4 cursor-pointer size-11 flex items-center justify-center">
            <img src="../assets/svg/Icon_pesanan.svg" />
          </div>
        </Link>
        <Link href="/checkout" className="relative mr-2 pr-2 border-r-2 ">
          <div className="p-3 bg-[#F5F7FA] rounded-full mr-4 cursor-pointer">
            <img src="../assets/svg/icon_black_shopping-cart.svg" />
          </div>
          {totalCart && totalCart > 0 && (
            <div className="absolute text-xs w-[20px] h-[20px] text-center top-0 right-4 bg-red-500 text-white rounded-full p-1">
              {totalCart}
            </div>
          )}
        </Link>

        <div className="relative" onClick={toggleSidebar}>
          <img
            src="../assets/svg/icon_button_hamburger-menu.svg"
            className="w-10"
          />
        </div>
      </div>
      {isSidebarOpen && <Sidebar onClose={() => setIsSidebarOpen(false)} />}

      <div className="items-center sm:hidden md:flex lg:flex xl:flex">
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

        <Link href="/pesanan" className="relative">
          <div className="p-3 bg-[#F5F7FA] rounded-full mr-4 cursor-pointer size-11 flex items-center justify-center">
            <img src="../assets/svg/Icon_pesanan.svg" />
          </div>
        </Link>

        <Link href="/checkout" className="relative mr-4 border-r-2">
          <div className="p-3 bg-[#F5F7FA] rounded-full mr-4 cursor-pointer size-11 flex items-center justify-center">
            <img src="../assets/svg/icon_black_shopping-cart.svg" />
          </div>
          {totalCart && totalCart > 0 && (
            <div className="absolute text-xs w-[20px] h-[20px] text-center top-0 right-4 bg-red-500 text-white rounded-full p-1">
              {totalCart}
            </div>
          )}
        </Link>

        {isGuest ? (
          <div
            className="cursor-pointer mr-4 border-2 border-primary py-2 text-white bg-primary px-8 rounded-md font-semibold text-sm"
            onClick={openLoginModal}
          >
            Login
          </div>
        ) : (
          <div className="flex gap-1">
            <div className="p-3 bg-[#F5F7FA] rounded-full mr-4">
              <img src="../assets/svg/icon_black_profile.svg" />
            </div>
            <div
              className="flex flex-col gap cursor-pointer"
              onClick={handleProfileClick}
            >
              <p className="-mb-1 text-sm">Hello</p>
              <p className="font-bold">
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
