/* eslint-disable jsx-a11y/alt-text */
import Link from "next/link";

interface EmptyStateProps {
  imageUrl: string;
  title: string;
  text: string;
  linkTo: string;
  linkText: string;
}

/* eslint-disable @next/next/no-img-element */
export default function EmptyStatePage({
  imageUrl,
  title,
  text,
  linkTo,
  linkText,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col gap-12 md:gap-8 items-center">
      <img src={imageUrl} width="450px" />
      <div className="flex flex-col text-center">
        <p className="text-3xl font-bold">{title}</p>
        <p className="text-xl">{text}</p>
      </div>
      <Link
        href={linkTo}
        className="cursor-pointer mr-4 border-2 border-primary py-2 md:py-3 text-white bg-primary px-8 rounded-md font-semibold text-sm"
      >
        {linkText}
      </Link>
    </div>
  );
}
