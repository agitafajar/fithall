/* eslint-disable jsx-a11y/alt-text */

import Link from "next/link";

/* eslint-disable @next/next/no-img-element */
export default function Footer() {
  return (
    <>
      <div className="sm:hidden md:grid lg:grid xl:grid grid-cols-5 font-plus-jakarta-sans justify-center px-24 py-12 items-center border-b-2 mt-12 bg-primary text-white">
        <div className="col-span-2 flex flex-col gap-6 ">
          <img src="../assets/png/logo-fithall2.png" width="100px" />
          <p className="pr-24">Fithall.id</p>
          <div className="flex gap-6">
            <img
              src="../assets/svg/icon_white_facebook.svg"
              className="pt-1 cursor-pointer"
            />
            <img
              src="../assets/svg/icon_white_twitter.svg"
              className="pt-1 cursor-pointer"
            />
            <img
              src="../assets/svg/icon_white_linkedin.svg"
              className="pt-1 cursor-pointer"
            />
            <img
              src="../assets/svg/icon_white_instagram.svg"
              className="pt-1 cursor-pointer"
            />
          </div>
        </div>
        <div className="col-span-1 flex flex-col gap-6">
          <p className="font-bold text-lg">Pages</p>
          <Link href="/lapangan" className="cursor-pointer">
            Lapangan
          </Link>
          <Link href="/kategori" className="cursor-pointer">
            Kategori
          </Link>
          <Link href="/about-us" className="cursor-pointer">
            About Us
          </Link>
        </div>
        <div className="col-span-1 flex flex-col gap-6">
          <p className="font-bold text-lg">Help & Support</p>
          <p className="cursor-pointer">Privacy Policy</p>
          <p className="cursor-pointer">Terms & Condition</p>
          <p className="cursor-pointer">F.A.Q</p>
        </div>
        <div className="col-span-1 flex flex-col gap-6">
          <p className="font-bold text-lg">Contact</p>
          <div className="flex gap-2 items-center cursor-pointer">
            <img src="../assets/svg/icon_white_phone-call.svg" />
            <p>(021) 555-0120</p>
          </div>
          <div className="flex gap-2 items-center cursor-pointer">
            <img src="../assets/svg/icon_white_mail.svg" />
            <p>fithall@gmail.com</p>
          </div>
          <div className="flex gap-2 items-start cursor-pointer">
            <img src="../assets/svg/icon_white_location.svg" className="pt-1" />
            <p>
              Kota Jakarta Selatan Daerah Khusus Ibukota Jakarta, Indonesia
              12760
            </p>
          </div>
        </div>
      </div>

      <div className="sm:flex md:hidden lg:hidden xl:hidden justify-between items-center bg-primary p-4 mt-4 ">
        <img src="../assets/png/logo-fithall2.png" width="80px" />
        <img src="../assets/png/ig.png" className="pt-1 cursor-pointer pr-4" />
      </div>
    </>
  );
}
