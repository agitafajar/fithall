import EmptyStatePage from "../components/cards/EmptyStateCard";

export default function KategoriPage() {
  return (
    <div className="flex items-center justify-center">
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
