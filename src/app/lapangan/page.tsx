import BannerCard from "../components/cards/BannerCard";
import EmptyStatePage from "../components/cards/EmptyStateCard";

export default function LapanganPage() {
  const title = "Fithall Kalibata";
  const icon = "./assets/png/fithall-circle.png";

  return (
    <>
      <div>
        <EmptyStatePage
          imageUrl="../assets/png/empty-state.png"
          title="This page is under development"
          text="This page is under development"
          linkTo="/"
          linkText="Back to Home"
        />
      </div>
    </>
  );
}
