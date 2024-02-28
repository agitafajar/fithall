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
      <div className="sm:hidden md:flex lg:flex xl:flex w-full border-t-2 fixed items-center bottom-0 left-0 px-4 md:px-12 bg-white z-[3000] flex gap-2 justify-end">
        <div className="mr-4">
          <p className="text-xs">Total Amount</p>
          <p className="font-bold text-primary">
            {formatToCurrency(totalSubTotal)}
          </p>
        </div>
        <Link
          href="/checkout"
          className="cursor-pointer mr-4 my-4 bg-white border-2 border-primary xl:py-3 lg:py-3 md:py-2 sm:py-2 md:my-4 text-primary   sm:px-2 md:px-8 lg:px-8 xl:px-8 rounded-md font-semibold text-sm"
        >
          + Keranjang
        </Link>
        <Link
          href="/checkout"
          className="cursor-pointer mr-4 my-4 lg:my-4 border-2 border-primary py-3 md:py-2 lg:py-3 md:my-4 text-white bg-primary px-8 rounded-md font-semibold text-sm"
        >
          Checkout ({totalCart} Items)
        </Link>
      </div>

      <div className="sm:flex flex-col md:hidden lg:hidden xl:hidden w-full border-t-2 fixed items-start bottom-0 left-0 px-4 pt-3 bg-white z-[3000] flex justify-end">
        <div className="mr-0">
          <p className="text-xs">Total Amount</p>
          <p className="font-bold text-primary">
            {formatToCurrency(totalSubTotal)}
          </p>
        </div>
        <div className="flex w-full justify-between">
          <Link
            href="/checkout"
            className="w-52 flex cursor-pointer mr-4 my-4 border-2 border-primary py-3 md:py-2 md:my-4 text-primary items-center justify-center text-center bg-white px-4 rounded-md font-semibold sm:text-sm xs:text-xs"
          >
            + Keranjang
          </Link>
          <Link
            href="/checkout"
            className="w-full flex cursor-pointer mr-0 my-4 lg:my-4 border-2 border-primary py-3 md:py-2 md:my-4 text-white items-center justify-center text-center bg-primary px-8 rounded-md font-semibold sm:text-sm xs:text-xs"
          >
            Checkout ({totalCart} Items)
          </Link>
        </div>
      </div>
    </>
  );
};

export default CartActions;
