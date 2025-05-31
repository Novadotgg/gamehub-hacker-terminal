
import React, { useState } from 'react';
import { Brain } from 'lucide-react';

const TicTacToe = () => {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState<string | null>(null);

  const checkWinner = (squares: (string | null)[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (let line of lines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }

    if (squares.every(square => square !== null)) {
      return 'DRAW';
    }

    return null;
  };

  const handleClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  const renderSquare = (index: number) => (
    <button
      key={index}
      onClick={() => handleClick(index)}
      className="w-16 h-16 bg-green-900/30 border border-green-400 text-green-300 font-mono text-2xl font-bold hover:bg-green-900/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-400/20"
    >
      {board[index]}
    </button>
  );

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="font-mono text-sm text-green-300 mb-2">
          {'>'} PLAYER: {isXNext ? 'X' : 'O'} | STATUS: {winner ? 'GAME_OVER' : 'ACTIVE'}
        </div>
      </div>

      <div className="flex justify-center">
        <div className="grid grid-cols-3 gap-2">
          {Array(9).fill(null).map((_, index) => renderSquare(index))}
        </div>
      </div>

      {winner && (
        <div className="glass-card p-4 rounded-lg text-center">
          <div className="text-green-300 font-mono mb-2">{'>'} RESULT:</div>
          <div className="text-2xl font-bold text-green-400 font-mono mb-4">
            {winner === 'DRAW' ? 'DRAW!' : `PLAYER ${winner} WINS!`}
          </div>
        </div>
      )}

      <div className="text-center">
        <button
          onClick={resetGame}
          className="bg-green-900/30 border border-green-400 text-green-300 px-6 py-2 rounded font-mono hover:bg-green-900/50 transition-all duration-300"
        >
          <Brain className="w-5 h-5 inline mr-2" />
          RESET GAME
        </button>
      </div>
    </div>
  );
};

export default TicTacToe;
