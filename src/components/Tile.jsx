import React from "react";
import clsx from "clsx";

const Tile = ({ value, isNew, isMerged }) => {
  const tileClass = clsx(
    "flex items-center justify-center w-20 h-20 max-sm:w-16 max-sm:h-16 text-2xl font-bold rounded-md transition duration-300 ease-in-out transform",
    {
      "bg-gray-700 text-gray-300": value === 0,
      "bg-yellow-100 text-gray-800": value === 2,
      "bg-yellow-200 text-gray-800": value === 4,
      "bg-yellow-300 text-gray-800": value === 8,
      "bg-yellow-400 text-gray-800": value === 16,
      "bg-yellow-500 text-gray-800": value === 32,
      "bg-yellow-600 text-gray-800": value === 64,
      "bg-yellow-700 text-gray-800": value === 128,
      "bg-yellow-800 text-gray-800": value === 256,
      "bg-yellow-900 text-gray-800": value === 512,
      "bg-red-500 text-white": value === 1024,
      "bg-red-600 text-white": value === 2048,
      "animate-appear": isNew,
      "animate-merge": isMerged,
    }
  );

  return <div className={tileClass}>{value !== 0 && value}</div>;
};

export default Tile;
