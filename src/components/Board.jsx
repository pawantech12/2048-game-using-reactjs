import React from "react";
import Tile from "./Tile";

const Board = ({ grid, newTiles, mergedTiles }) => {
  return (
    <div className="grid grid-cols-4 gap-4  bg-gray-400 p-4 rounded-lg">
      {grid.map((row, rowIndex) =>
        row.map((value, colIndex) => (
          <Tile
            key={`${rowIndex}-${colIndex}`}
            value={value}
            isNew={newTiles.some(([r, c]) => r === rowIndex && c === colIndex)}
            isMerged={mergedTiles.some(
              ([r, c]) => r === rowIndex && c === colIndex
            )}
          />
        ))
      )}
    </div>
  );
};

export default Board;
