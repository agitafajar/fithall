/* eslint-disable jsx-a11y/alt-text */

import Link from "next/link";

/* eslint-disable @next/next/no-img-element */
export default function EmptyStatePage() {
  return (
    <>
      <div className="flex flex-col gap-12 items-center">
        <img src="../assets/png/empty-state.png" width="520px" />
        <div className="flex flex-col text-center">
          <p className="text-3xl font-bold">This page is under development</p>
          <p className="text-xl">This page is under development</p>
        </div>
        <Link
          href="/"
          className="cursor-pointer mr-4 border-2 border-primary py-2 md:py-3 text-white bg-primary px-8 rounded-md font-semibold text-sm"
        >
          Back to Home
        </Link>
      </div>
    </>
  );
}
