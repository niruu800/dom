import React from "react";

export default function LoadingSpinner({ size = "lg" }) {
  const spinnerSize =
    size === "sm" ? "w-6 h-6" : size === "md" ? "w-8 h-8" : "w-12 h-12";

  return (
    <div className="flex items-center justify-center">
      <div
        className={`${spinnerSize} border-4 border-white/30 border-t-white rounded-full animate-spin`}
      />
    </div>
  );
}
