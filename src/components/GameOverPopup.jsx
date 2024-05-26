// GameOverPopup.js
import React from "react";

const GameOverPopup = ({ onNewGame }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white px-8 py-4 rounded shadow-lg flex flex-col items-center">
        <h2 className="text-4xl font-bold mb-4">Congratulations!</h2>
        <p className="text-lg mb-4">You won the game!</p>
        <button
          className="mt-2 p-2 bg-slate-500 text-white rounded"
          onClick={onNewGame}
        >
          New Game
        </button>
      </div>
    </div>
  );
};

export default GameOverPopup;
