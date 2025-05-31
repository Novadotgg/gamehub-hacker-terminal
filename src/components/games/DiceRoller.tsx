
import React, { useState } from 'react';
import { Dice2 } from 'lucide-react';

const DiceRoller = () => {
  const [diceCount, setDiceCount] = useState(1);
  const [results, setResults] = useState<number[]>([]);
  const [isRolling, setIsRolling] = useState(false);

  const rollDice = () => {
    setIsRolling(true);
    
    setTimeout(() => {
      const newResults = [];
      for (let i = 0; i < diceCount; i++) {
        newResults.push(Math.floor(Math.random() * 6) + 1);
      }
      setResults(newResults);
      setIsRolling(false);
    }, 500);
  };

  const total = results.reduce((sum, result) => sum + result, 0);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="font-mono text-sm text-green-300 mb-2">
          {'>'} DICE_COUNT: {diceCount} | STATUS: {isRolling ? 'ROLLING...' : 'READY'}
        </div>
      </div>

      <div className="flex items-center space-x-4 justify-center">
        <label className="font-mono text-green-300">Dice Count:</label>
        <select
          value={diceCount}
          onChange={(e) => setDiceCount(Number(e.target.value))}
          className="bg-black border border-green-400 text-green-300 px-3 py-1 rounded font-mono"
        >
          {[1, 2, 3, 4, 5, 6].map(num => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>
      </div>

      <div className="text-center">
        <button
          onClick={rollDice}
          disabled={isRolling}
          className="bg-green-900/30 border border-green-400 text-green-300 px-6 py-3 rounded-lg font-mono hover:bg-green-900/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-400/20 disabled:opacity-50"
        >
          <Dice2 className="w-5 h-5 inline mr-2" />
          {isRolling ? 'ROLLING...' : 'EXECUTE ROLL'}
        </button>
      </div>

      {results.length > 0 && (
        <div className="glass-card p-4 rounded-lg">
          <div className="text-green-300 font-mono mb-2">{'>'} RESULTS:</div>
          <div className="flex flex-wrap gap-2 justify-center mb-4">
            {results.map((result, index) => (
              <div
                key={index}
                className="w-12 h-12 bg-green-900/50 border border-green-400 rounded flex items-center justify-center text-green-300 font-mono text-xl font-bold"
              >
                {result}
              </div>
            ))}
          </div>
          <div className="text-center font-mono text-green-300">
            {'>'} TOTAL: <span className="text-green-400 text-xl font-bold">{total}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiceRoller;
