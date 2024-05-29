import React from "react";

const GameOverPopup = ({ onNewGame }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-800 px-8 py-4 rounded shadow-lg flex flex-col items-center">
        <h2 className="text-4xl font-bold mb-4 text-white">You Won!</h2>
        <button
          className="mt-2 p-2 bg-gray-800 text-white rounded transition duration-300 ease-in-out transform hover:scale-105"
          onClick={onNewGame}
        >
          Play Again
        </button>
      </div>
    </div>
  );
};

export default GameOverPopup;
