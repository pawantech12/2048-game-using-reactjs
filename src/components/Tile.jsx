import React from "react";
import clsx from "clsx";

const Tile = ({ value, isNew, isMerged, isMoving }) => {
  const tileClass = clsx(
    "flex items-center justify-center w-20 h-20 max-sm:w-16 max-sm:h-16 text-2xl font-bold rounded-md",
    {
      "bg-gray-300": value === 0,
      "bg-gray-200": value === 2,
      "bg-gray-100": value === 4,
      "bg-yellow-200": value === 8,
      "bg-yellow-300": value === 16,
      "bg-yellow-400": value === 32,
      "bg-yellow-500": value === 64,
      "bg-yellow-600": value === 128,
      "bg-yellow-700": value === 256,
      "bg-yellow-800": value === 512,
      "bg-yellow-900": value === 1024,
      "bg-red-600": value === 2048,
      "animate-appear": isNew,
      "animate-merge": isMerged,
      "animate-move": isMoving,
    }
  );

  return <div className={tileClass}>{value !== 0 && value}</div>;
};

export default Tile;
