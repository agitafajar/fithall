import EmptyStatePage from "../components/cards/EmptyStateCard";

export default function AboutUsPage() {
  return (
    <>
      <div className="flex items-center justify-center">
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
