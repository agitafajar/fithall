/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import BannerCard from "@/app/components/cards/BannerCard";

export default function AboutLapanganPage() {
  const title = "Fithall Kalibata";
  const icon = "../assets/png/fithall-circle.png";

  return (
    <>
      <BannerCard icon={icon} title={title} />
      <p className="my-6 font-bold">Lapangan Badminton</p>
      <div className="flex gap-6">
        <img src="../assets/png/contoh-list-lapangan.png" className="w-[45%]" />
        <div className="w-[55%] flex flex-col gap-6">
          <p>
            Lorem ipsum dolor sit amet consectetur. Et nisi purus suspendisse
            sed. Molestie vestibulum nunc tortor et risus nisl vulputate. Enim
            magna et nibh sed habitasse non ultrices. Vitae interdum turpis
            semper maecenas mi nunc mattis risus. Non quam eget egestas ante
            vestibulum sodales. Quisque praesent quis suspendisse commodo elit
            aliquet aliquam et mauris. Nullam in aliquam venenatis tortor
            vulputate. Aliquam diam ut elementum montes tellus. Mi enim bibendum
            varius tempor sollicitudin sit commodo.
          </p>
          <p>
            Sagittis urna pulvinar adipiscing tempus. Placerat dignissim ac
            volutpat lectus massa facilisi id mauris. Ac urna ipsum risus quis
            semper turpis. Pellentesque morbi viverra bibendum aliquet et
            aliquam auctor pellentesque eros. Id donec orci orci urna quis
            adipiscing. Elementum blandit commodo in in. Ac velit dolor tempor
            diam non morbi cras proin. Turpis non lectus ut amet. Ultricies
            vestibulum donec lorem donec nulla elementum at est. Massa sed purus
            faucibus viverra nec risus ut. Nunc mauris eget porta eget iaculis
            enim quam nisl fermentum. Purus eleifend tristique pellentesque sed
            vehicula luctus massa. Sed eget felis viverra vitae. Velit accumsan
            massa enim pellentesque dictum varius feugiat semper. Arcu dui
            egestas quis enim nibh donec gravida condimentum arcu. Nulla a
            praesent vitae mauris. Proin vitae varius commodo eu.
          </p>
          <p>
            Faucibus sollicitudin gravida bibendum nisl velit sed. Sollicitudin
            rhoncus scelerisque ut neque volutpat. Rhoncus vulputate massa purus
            etiam venenatis aliquet. Sit massa placerat et tortor. Lobortis
            fames magna viverra quis consectetur lorem eget id. Orci luctus
            tempus enim fermentum maecenas elementum ut. Potenti ipsum a
            tincidunt in ultricies blandit magna ac integer. Neque euismod
            egestas nibh vitae blandit magnis adipiscing pulvinar. Malesuada
            nulla eget vitae pellentesque adipiscing arcu tempor facilisis
            scelerisque. Rutrum morbi elit at odio in interdum.
          </p>
        </div>
      </div>
    </>
  );
}
