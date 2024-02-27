"use client";

import EmptyStatePage from "./components/cards/EmptyStateCard";

export default function ErrorPage() {
  return (
    <div>
      <EmptyStatePage
        imageUrl="../assets/svg/img_something-error.svg"
        title="Oops!"
        text="Somethings went wrong"
        linkTo="/"
        linkText="Back to Home"
      />
    </div>
  );
}
