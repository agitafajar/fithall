/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
// Sidebar.js
import React, { useEffect, useState } from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import LoginModal from "../modal/LoginModal";
import RegisterModal from "../modal/RegisterModal";
import useGetUser from "@/features/users/useGetUser";

interface SidebarProps {
  onClose: React.MouseEventHandler<HTMLButtonElement>;
}

const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const { data } = useGetUser();
  const isGuest = data?.data.id === 2;

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

  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  useEffect(() => {
    if (isGuest) {
      console.log(isGuest);
    }
  }, [isGuest]);

  return (
    <div className="fixed top-0 left-0 w-[80%] h-full bg-white z-50">
      <div className="px-4 flex flex-col items-center justify-start w-full mt-4">
        {isGuest ? (
          <div
            className="text-center cursor-pointer mx-12 border-2 border-primary py-2 w-full mb-4  text-white bg-primary px-8 rounded-md font-semibold text-sm"
            onClick={openLoginModal}
          >
            Login
          </div>
        ) : (
          <div className="flex gap-1 w-full mb-4">
            <div className="p-3 bg-[#F5F7FA] rounded-full mr-4">
              <img src="../assets/png/profile.png" />
            </div>
            <div className="flex flex-col gap cursor-pointer">
              <p className="-mb-1 text-sm">Hello</p>
              <p className="font-bold">
                {data?.data.name.length > 20
                  ? `${data?.data.name.substring(0, 21)}...`
                  : data?.data.name}
              </p>
            </div>
          </div>
        )}

        <div className="w-full">
          <Link href="/login">
            <p className="text-black mb-4 text-left border-b-2 pb-3">Home</p>
          </Link>
        </div>
        <div className="w-full">
          <Link href="/login">
            <p className="text-black mb-4 text-left border-b-2 pb-3">
              Lapangan
            </p>
          </Link>
        </div>
        <div className="w-full">
          <Link href="/login">
            <p className="text-black mb-4 text-left border-b-2 pb-3">
              About Us
            </p>
          </Link>
        </div>
        {isGuest ? (
          ""
        ) : (
          <div
            className="text-center cursor-pointer border-2 border-[#E02B2B] py-2 w-full mb-4  text-white bg-[#E02B2B] px-8 rounded-md font-semibold text-sm"
            onClick={logout}
          >
            Logout
          </div>
        )}
        {isLoginModalOpen && (
          <LoginModal
            closeModal={closeLoginModal}
            registerModal={openRegisterModal}
          />
        )}
      </div>
      {isRegisterModalOpen && (
        <RegisterModal
          closeModal={closeRegisterModal}
          loginModal={openLoginModal}
        />
      )}
    </div>
  );
};

Sidebar.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default Sidebar;
