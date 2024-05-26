const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min) + min);

export const initializeGrid = () => {
  const grid = Array.from({ length: 4 }, () => Array(4).fill(0));
  addRandomTile(grid);
  addRandomTile(grid);
  return grid;
};

const addRandomTile = (grid) => {
  const emptyTiles = [];
  grid.forEach((row, rowIndex) => {
    row.forEach((value, colIndex) => {
      if (value === 0) emptyTiles.push([rowIndex, colIndex]);
    });
  });

  if (emptyTiles.length > 0) {
    const [row, col] = emptyTiles[getRandomInt(0, emptyTiles.length)];
    grid[row][col] = Math.random() < 0.9 ? 2 : 4;
    return [row, col];
  }
  return null;
};

export const moveTiles = (grid, direction) => {
  let newGrid = grid.map((row) => [...row]);
  let moved = false;
  let score = 0;
  let newTiles = [];
  let mergedTiles = [];

  switch (direction) {
    case "up":
      for (let col = 0; col < 4; col++) {
        let rowIndex = 0;
        for (let row = 1; row < 4; row++) {
          if (newGrid[row][col] !== 0) {
            let currentValue = newGrid[row][col];
            let mergeTile = false;
            for (let i = row - 1; i >= rowIndex; i--) {
              if (newGrid[i][col] === 0) {
                newGrid[i][col] = currentValue;
                newGrid[row][col] = 0;
                row = i;
                moved = true;
              } else if (newGrid[i][col] === currentValue && !mergeTile) {
                newGrid[i][col] *= 2;
                newGrid[row][col] = 0;
                score += newGrid[i][col];
                mergeTile = true;
                moved = true;
                rowIndex = i + 1;
                mergedTiles.push([i, col]);
              } else {
                break;
              }
            }
          }
        }
      }
      break;
    case "right":
      for (let row = 0; row < 4; row++) {
        let colIndex = 3;
        for (let col = 2; col >= 0; col--) {
          if (newGrid[row][col] !== 0) {
            let currentValue = newGrid[row][col];
            let mergeTile = false;
            for (let j = col + 1; j <= colIndex; j++) {
              if (newGrid[row][j] === 0) {
                newGrid[row][j] = currentValue;
                newGrid[row][col] = 0;
                col = j;
                moved = true;
              } else if (newGrid[row][j] === currentValue && !mergeTile) {
                newGrid[row][j] *= 2;
                newGrid[row][col] = 0;
                score += newGrid[row][j];
                mergeTile = true;
                moved = true;
                colIndex = j - 1;
                mergedTiles.push([row, j]);
              } else {
                break;
              }
            }
          }
        }
      }
      break;
    case "down":
      for (let col = 0; col < 4; col++) {
        let rowIndex = 3;
        for (let row = 2; row >= 0; row--) {
          if (newGrid[row][col] !== 0) {
            let currentValue = newGrid[row][col];
            let mergeTile = false;
            for (let i = row + 1; i <= rowIndex; i++) {
              if (newGrid[i][col] === 0) {
                newGrid[i][col] = currentValue;
                newGrid[row][col] = 0;
                row = i;
                moved = true;
              } else if (newGrid[i][col] === currentValue && !mergeTile) {
                newGrid[i][col] *= 2;
                newGrid[row][col] = 0;
                score += newGrid[i][col];
                mergeTile = true;
                moved = true;
                rowIndex = i - 1;
                mergedTiles.push([i, col]);
              } else {
                break;
              }
            }
          }
        }
      }
      break;
    case "left":
      for (let row = 0; row < 4; row++) {
        let colIndex = 0;
        for (let col = 1; col < 4; col++) {
          if (newGrid[row][col] !== 0) {
            let currentValue = newGrid[row][col];
            let mergeTile = false;
            for (let j = col - 1; j >= colIndex; j--) {
              if (newGrid[row][j] === 0) {
                newGrid[row][j] = currentValue;
                newGrid[row][col] = 0;
                col = j;
                moved = true;
              } else if (newGrid[row][j] === currentValue && !mergeTile) {
                newGrid[row][j] *= 2;
                newGrid[row][col] = 0;
                score += newGrid[row][j];
                mergeTile = true;
                moved = true;
                colIndex = j + 1;
                mergedTiles.push([row, j]);
              } else {
                break;
              }
            }
          }
        }
      }
      break;
    default:
      break;
  }

  if (moved) {
    const newTile = addRandomTile(newGrid);
    if (newTile) {
      newTiles.push(newTile);
    }
    return { newGrid, newScore: score, newTiles, mergedTiles, isMoving: true };
  } else {
    return {
      newGrid: null,
      newScore: 0,
      newTiles: [],
      mergedTiles: [],
      isMoving: false,
    };
  }
};

export const isGameOver = (grid) => {
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      if (grid[row][col] === 0) return false; // Empty tile exists
      if (col < 3 && grid[row][col] === grid[row][col + 1]) return false; // Horizontal merge possible
      if (row < 3 && grid[row][col] === grid[row + 1][col]) return false; // Vertical merge possible
    }
  }
  return true; // No empty tiles or possible merges
};

export const hasReached2048 = (grid) => {
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      if (grid[row][col] === 2048) {
        return true;
      }
    }
  }
  return false;
};
