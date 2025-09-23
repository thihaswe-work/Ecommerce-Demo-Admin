// components/Loader.tsx
import React from "react";

const Loader = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-background">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
    </div>
  );
};

export default Loader;
