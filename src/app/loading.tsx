import React from "react";

const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="border-t-8 border-primary border-solid rounded-full h-16 w-16 animate-spin"></div>
    </div>
  );
};

export default LoadingPage;
