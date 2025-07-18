import React from "react";

function Loader() {
  return (
    <div className="min-h-dvh flex justify-center items-start px-4 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-6xl">
        {[1, 2].map((_, i) => (
          <div
            key={i}
            className="p-4 sm:p-6 bg-white shadow-md sm:shadow-lg rounded-lg sm:rounded-xl animate-pulse space-y-4"
          >
            <div className="h-48 sm:h-52 bg-gray-300 rounded-md w-full" />
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
            <div className="h-4 bg-gray-200 rounded w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Loader;
