/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";

export default function JoinMemberCard() {
  return (
    <>
      <div
        className="text-white -mx-24 mb-4 -mt-8 sm:hidden hidden-col bg-red-300 gap-8 px-4 md:flex lg:flex xl:flex items-center justify-start"
        style={{
          backgroundImage: "url('../assets/png/joinmember.png')",
          backgroundSize: "cover",
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
          <Link
            href="/member"
            className="flex w-[40%] gap-2 cursor-pointer mr-4 items-center border-2 border-primary py-4 text-white bg-primary px-12 md:px-8 rounded-md font-semibold justify-center"
          >
            <p>Join Member</p>
          </Link>
        </div>
      </div>

      <div
        className="text-white mb-4 text-center sm:flex flex-col bg-red-300 -mx-4 gap-8 px-4 md:hidden lg:hidden xl:hidden items-center justify-center"
        style={{
          backgroundImage: "url('../assets/png/joinmembermobile.png')",
          backgroundSize: "cover",
          height: "70vh",
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
    </>
  );
}
