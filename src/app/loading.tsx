import React from "react";

const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="border-t-8 border-primary border-solid rounded-full h-16 w-16 animate-spin"></div>
      <p className="ml-4 text-xl font-semibold text-primary">Loading Page</p>
    </div>
  );
};

export default LoadingPage;
