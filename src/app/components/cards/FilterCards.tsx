/* eslint-disable @next/next/no-img-element */
"use client ";

type Props = {
  title: string;
  desc: string;
  icon: string;
};
export default function FilterCard(props: Props) {
  const { title, desc, icon } = props;

  return (
    <>
      <div className="flex items-center gap-2 pr-12 border-r-2 cursor-pointer">
        <img src={icon} alt="" width="20px" height="20px" />
        <div className="flex flex-col -gap-4">
          <p className="font-bold">{title}</p>
          <p className="text-sm text-[#808080]">{desc}</p>
        </div>
      </div>
    </>
  );
}
