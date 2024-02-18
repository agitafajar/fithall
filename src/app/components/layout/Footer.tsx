/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
export default function Footer() {
  return (
    <>
      <div className="sm:hidden md:grid lg:grid xl:grid grid-cols-5 font-plus-jakarta-sans justify-center px-24 py-12 items-center border-b-2 mt-12 bg-primary text-white">
        <div className="col-span-2 flex flex-col gap-6 ">
          <img src="../assets/png/logo-fithall2.png" width="100px" />
          <p className="pr-24">
            Lörem ipsum od ohet dilogi. Bell trabel, samuligt, ohöbel utom
            diska. Jinesade bel när feras redorade i belogi. FAR paratyp i
            muvåning, och pesask vyfisat. Viktiga poddradio har un mad och inde.
          </p>
          <div className="flex gap-6">
            <img src="../assets/png/fb.png" className="pt-1 cursor-pointer" />
            <img src="../assets/png/tw.png" className="pt-1 cursor-pointer" />
            <img src="../assets/png/ln.png" className="pt-1 cursor-pointer" />
            <img src="../assets/png/ig.png" className="pt-1 cursor-pointer" />
          </div>
        </div>
        <div className="col-span-1 flex flex-col gap-6">
          <p className="font-bold text-lg">Pages</p>
          <p className="cursor-pointer">Lapangan</p>
          <p className="cursor-pointer">Kategori</p>
          <p className="cursor-pointer">About Us</p>
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
            <img src="../assets/png/call.png" />
            <p>(021) 555-0120</p>
          </div>
          <div className="flex gap-2 items-center cursor-pointer">
            <img src="../assets/png/mail.png" />
            <p>fithall@gmail.com</p>
          </div>
          <div className="flex gap-2 items-start cursor-pointer">
            <img src="../assets/png/white-location.png" className="pt-1" />
            <p>2972 Westheimer Rd. Santa Ana, Illinois 85486 </p>
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
