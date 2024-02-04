import BannerCard from "../components/cards/BannerCard";

export default function BookingPage() {
  const title = "Fithall Kalibata";
  const icon = "./assets/png/fithall-circle.png";

  return (
    <>
      <div>
        <BannerCard title={title} icon={icon} />
      </div>
    </>
  );
}
