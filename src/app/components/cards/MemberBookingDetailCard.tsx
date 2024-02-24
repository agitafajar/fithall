/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
// BookingDetail.tsx
import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { formatToCurrency } from "../../../lib/formatTimeCurrency";

interface BookingDetailProps {
  full_name: string;
  pretty_date: string;
  status?: string;
  harga_visit: number;
  harga_member?: number;
  id: string;
  isDeleteLoading: boolean;
  onDelete: (id: string) => void;
}

const MemberBookingDetailCard: React.FC<BookingDetailProps> = ({
  full_name,
  pretty_date,
  harga_visit,
  harga_member,
  id,
  isDeleteLoading,
  status,
  onDelete,
}) => (
  <div className="mb-4 flex justify-between items-center w-full">
    <div className="text-[#323F4B]">
      <p className="font-bold text-sm mb-1">{full_name}</p>
      <p>{pretty_date}</p>
      {harga_member ? (
        <>
          <p style={{ textDecoration: "line-through" }}>
            {formatToCurrency(harga_visit)}
          </p>
          <p>{formatToCurrency(harga_member)}</p>
        </>
      ) : (
        <p>{formatToCurrency(harga_visit)}</p>
      )}
      <p className="px-4 bg-[#F3DB90] text-sm font-semibold text-center rounded-lg">
        {status}
      </p>
    </div>
    <div>
      <div>
        {isDeleteLoading ? (
          <ClipLoader color="red" />
        ) : (
          <img
            src="../assets/png/trash.png"
            className="cursor-pointer"
            onClick={() => onDelete(id)}
          />
        )}
      </div>
    </div>
  </div>
);

export default MemberBookingDetailCard;
