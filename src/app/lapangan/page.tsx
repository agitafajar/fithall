import EmptyStatePage from "../components/cards/EmptyStateCard";

export default function LapanganPage() {
  return (
    <div>
      <EmptyStatePage
        imageUrl="../assets/svg/img_under-maintenance.svg"
        title="We'll be back soon!"
        text="This page is under development"
        linkTo="/"
        linkText="Back to Home"
      />
    </div>
  );
}
