/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

export default function JoinMemberCard() {
  return (
    <>
      <div className="bg-[#EEEEEE] -mx-24 p-24 grid grid-cols-2 items-center mb-4">
        <div className="flex flex-col w-[60%] gap-12">
          <p className="text-4xl font-bold">
            Eksklusifitas Lapangan Menjadi Milikmu!
          </p>
          <p className="font-semibold">
            Keistimewaan Eksklusif: Bergabunglah dengan Membership, Raih
            Privilege Penuh di Booking Lapangan!
          </p>
          <div className="flex w-[40%] gap-2 cursor-pointer mr-4 items-center border-2 border-primary py-4 text-white bg-primary px-12 rounded-md font-semibold text-xs justify-center">
            <p>Join Member</p>
          </div>
        </div>
        <div className="flex justify-center">
          <img src="./assets/png/join-member.png" />
        </div>
      </div>
    </>
  );
}
