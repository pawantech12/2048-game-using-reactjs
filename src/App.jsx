import React, { useState, useEffect, useRef } from "react";
import Board from "./components/Board";
import {
  initializeGrid,
  moveTiles,
  isGameOver,
  hasReached2048,
} from "./components/gameLogic";
import { IoMdRefresh } from "react-icons/io";
import GameOverPopup from "./components/GameOverPopup";
const App = () => {
  const [grid, setGrid] = useState(initializeGrid);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(
    () => localStorage.getItem("bestScore") || 0
  );
  const [newTiles, setNewTiles] = useState([]);
  const [mergedTiles, setMergedTiles] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);
  const handleKeyDown = (e) => {
    const { newGrid, newScore, newTiles, mergedTiles } = moveTiles(
      grid,
      e.key.replace("Arrow", "").toLowerCase()
    );

    if (newGrid) {
      setGrid(newGrid);
      setScore((prevScore) => prevScore + newScore);
      setNewTiles(newTiles);
      setMergedTiles(mergedTiles);
      if (isGameOver(newGrid)) {
        setGameOver(true);
      }
      if (hasReached2048(newGrid)) {
        setGameWon(true);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [grid]);

  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score);
      localStorage.setItem("bestScore", score);
    }
  }, [score, bestScore]);

  const handleNewGame = () => {
    setGrid(initializeGrid());
    setScore(0);
    setNewTiles([]);
    setMergedTiles([]);
    setGameOver(false);
    setGameWon(false);
  };
  const handleSwipe = (direction) => {
    const { newGrid, newScore, newTiles, mergedTiles } = moveTiles(
      grid,
      direction
    );

    if (newGrid) {
      setGrid(newGrid);
      setScore((prevScore) => prevScore + newScore);
      setNewTiles(newTiles);
      setMergedTiles(mergedTiles);
      if (isGameOver(newGrid)) {
        setGameOver(true);
      }
    }
  };

  useEffect(() => {
    const handleTouchStart = (e) => {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      e.preventDefault();
      if (!touchStartX.current || !touchStartY.current) {
        return;
      }

      const touchEndX = e.touches[0].clientX;
      const touchEndY = e.touches[0].clientY;

      const deltaX = touchStartX.current - touchEndX;
      const deltaY = touchStartY.current - touchEndY;

      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 0) {
          handleSwipe("left");
        } else {
          handleSwipe("right");
        }
      } else {
        if (deltaY > 0) {
          handleSwipe("up");
        } else {
          handleSwipe("down");
        }
      }

      touchStartX.current = null;
      touchStartY.current = null;
    };

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [grid]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-6xl font-bold mb-4 text-gray-400">2048</h1>
      <div className="flex mb-4 space-x-4 items-center justify-between ">
        <div className="text-xl font-semibold bg-slate-400 rounded-md text-white py-2 px-3">
          Score: {score}
        </div>
        <div className="text-xl font-semibold bg-slate-400 rounded-md text-white py-2 px-3">
          Best: {bestScore}
        </div>
        <button
          className="text-2xl font-semibold bg-slate-400 hover:bg-slate-500 rounded-md text-white py-2 px-3"
          onClick={handleNewGame}
        >
          <IoMdRefresh />
        </button>
      </div>
      <Board grid={grid} newTiles={newTiles} mergedTiles={mergedTiles} />

      {gameOver && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white px-8 py-4 rounded shadow-lg flex flex-col items-center">
            <h2 className="text-4xl font-bold mb-4">Game Over</h2>
            <button
              className="mt-2 p-2 bg-slate-500 text-white rounded"
              onClick={handleNewGame}
            >
              Try Again
            </button>
          </div>
        </div>
      )}
      {gameWon && <GameOverPopup onNewGame={handleNewGame} />}
    </div>
  );
};

export default App;
