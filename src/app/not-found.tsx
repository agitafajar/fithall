import EmptyStatePage from "./components/cards/EmptyStateCard";

export default function NotFoundPage() {
  return (
    <main>
      <div className="flex items-center justify-center">
        <EmptyStatePage
          imageUrl="../assets/svg/img_not-found.svg"
          title="Page not found"
          text="The page you search is not found"
          linkTo="/"
          linkText="Back to Home"
        />
    </div>
    </main>
  );
}
