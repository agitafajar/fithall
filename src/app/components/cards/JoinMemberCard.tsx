/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

import useGetUser from "@/features/users/useGetUser";
import Link from "next/link";
import { useState } from "react";
import LoginModal from "../modal/LoginModal";
import RegisterModal from "../modal/RegisterModal";

export default function JoinMemberCard() {
  const { data } = useGetUser();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

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

  return (
    <>
      <div
        className="text-white -mx-24 mb-4 -mt-12 sm:hidden hidden-col bg-red-300 gap-8 px-4 md:flex lg:flex xl:flex items-center justify-start"
        style={{
          background: "linear-gradient(to top, rgba(3, 3, 3, 0.647), rgba(0, 0, 0, 0.11)), url('../assets/png/img_join-member.webp')",
          // backgroundImage: "url('../assets/png/img_join-member.webp')",
          backgroundSize: "cover",
          width: "auto",
          height: "100vh",
          backgroundColor: "rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="w-[50%] flex flex-col gap-12 pl-24">
          <p className="text-3xl font-bold">
            Welcome Fit-People, Lokasi Lapangan Olahraga Terbaik
          </p>
          <p className="">
            Fithall memberikan kamu kemudahan untuk tempat berolahraga dengan
            berbagai type lapangan olahraga dan dapat di sewa untuk kegiatan
            acara special kalian seperti perkawinan, foto session, pernikahan.
            kedepan kamu juga bisa bergabung dengan beragam komunitas olahraga
            untuk bermain bersama! Nantikan
          </p>
          <Link href={isGuest ? "#" : "/member"}>
            <p
              onClick={() => isGuest && setIsLoginModalOpen(true)}
              className="flex w-[40%] gap-2 cursor-pointer mr-4 items-center border-2 border-primary py-4 text-white bg-primary px-12 md:px-8 rounded-md font-semibold justify-center"
            >
              Join Member
            </p>
          </Link>
        </div>
      </div>

      <div
        className="text-white mb-4 text-center sm:flex flex-col bg-red-300 -mx-4 gap-8 px-4 md:hidden lg:hidden xl:hidden items-center justify-center"
        style={{
          background: "linear-gradient(to top, rgba(3, 3, 3, 0.647), rgba(0, 0, 0, 0.11)), url('../assets/png/img_join-member_mobile.webp')",
          // backgroundImage: "url('../assets/png/joinmembermobile.png')",
          backgroundSize: "cover",
          height: "80vh",
          backgroundColor: "rgba(0, 0, 0, 0.1)",
        }}
      >
        <p className="text-3xl font-bold">
          Welcome Fit-People, Lokasi Lapangan Olahraga Terbaik
        </p>
        <p className="">
          Fithall memberikan kamu kemudahan untuk tempat berolahraga dengan
          berbagai type lapangan olahraga dan dapat di sewa untuk kegiatan acara
          special kalian seperti perkawinan, foto session, pernikahan. kedepan
          kamu juga bisa bergabung dengan beragam komunitas olahraga untuk
          bermain bersama! Nantikan
        </p>
        <Link
          href="/member"
          className="flex w-[70%] cursor-pointer items-center border-2 border-primary py-3 text-white bg-primary rounded-md justify-center"
        >
          <p>Join Member</p>
        </Link>
      </div>
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
    </>
  );
}
