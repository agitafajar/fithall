import React, { FC } from "react";
import Link from "next/link";
import { formatToCurrency } from "@/lib/formatTimeCurrency";

interface CartActionsProps {
  totalSubTotal: number;
  totalCart: number;
}

const CartActions: FC<CartActionsProps> = ({ totalSubTotal, totalCart }) => {
  return (
    <>
      <div className="sm:hidden md:flex lg:flex xl:flex w-full border-t-2 fixed items-center bottom-0 left-0 px-4 md:px-24 bg-white z-[3000] flex gap-2 justify-end">
        <div className="mr-4">
          <p className="text-xs">Total Amount</p>
          <p className="font-bold text-primary">
            {formatToCurrency(totalSubTotal)}
          </p>
        </div>
        <Link
          href="/checkout"
          className="cursor-pointer mr-4 my-4 border-2 border-primary py-3 md:py-2 md:my-2 text-primary bg-white px-8 rounded-md font-semibold text-sm"
        >
          + Keranjang
        </Link>
        <Link
          href="/checkout"
          className="cursor-pointer mr-4 my-4 lg:my-4 border-2 border-primary py-3 md:py-2 md:my-2 text-white bg-primary px-8 rounded-md font-semibold text-sm"
        >
          Checkout ({totalCart} Items)
        </Link>
      </div>

      <div className="sm:flex flex-col md:hidden lg:hidden xl:hidden w-full border-t-2 fixed items-start bottom-0 left-0 p-4 bg-white z-[3000] flex gap-2 justify-end">
        <div className="mr-4">
          <p className="text-xs">Total Amount</p>
          <p className="font-bold text-primary">
            {formatToCurrency(totalSubTotal)}
          </p>
        </div>
        <div className="flex">
          <Link
            href="/checkout"
            className="cursor-pointer mr-4 my-4 border-2 border-primary py-3 md:py-2 md:my-2 text-primary bg-white px-8 rounded-md font-semibold text-sm"
          >
            m + Keranjang
          </Link>
          <Link
            href="/checkout"
            className="cursor-pointer mr-4 my-4 lg:my-4 border-2 border-primary py-3 md:py-2 md:my-2 text-white bg-primary px-8 rounded-md font-semibold text-sm"
          >
            Checkout ({totalCart} Items)
          </Link>
        </div>
      </div>
    </>
  );
};

export default CartActions;
