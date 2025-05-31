import React, { useState } from 'react';
import { Coins } from 'lucide-react';

const CoinToss = () => {
  const [result, setResult] = useState<'heads' | 'tails' | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [history, setHistory] = useState<('heads' | 'tails')[]>([]);

  const flipCoin = () => {
    setIsFlipping(true);
    
    setTimeout(() => {
      const newResult = Math.random() < 0.5 ? 'heads' : 'tails';
      setResult(newResult);
      setHistory(prev => [...prev, newResult]);
      setIsFlipping(false);
    }, 1000);
  };

  const headsCount = history.filter(r => r === 'heads').length;
  const tailsCount = history.filter(r => r === 'tails').length;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="font-mono text-sm text-green-300 mb-2">
          {'>'} STATUS: {isFlipping ? 'FLIPPING...' : 'READY'} | FLIPS: {history.length}
        </div>
      </div>

      <div className="text-center">
        <div className={`w-24 h-24 mx-auto rounded-full border-2 border-green-400 flex items-center justify-center transition-all duration-1000 ${isFlipping ? 'animate-spin' : ''}`}>
          <Coins className="w-12 h-12 text-green-400" />
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={flipCoin}
          disabled={isFlipping}
          className="bg-green-900/30 border border-green-400 text-green-300 px-6 py-3 rounded-lg font-mono hover:bg-green-900/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-400/20 disabled:opacity-50"
        >
          {isFlipping ? 'FLIPPING...' : 'EXECUTE FLIP'}
        </button>
      </div>

      {result && (
        <div className="glass-card p-4 rounded-lg text-center">
          <div className="text-green-300 font-mono mb-2">{'>'} RESULT:</div>
          <div className="text-3xl font-bold text-green-400 font-mono mb-4">
            {result.toUpperCase()}
          </div>
        </div>
      )}

      {history.length > 0 && (
        <div className="glass-card p-4 rounded-lg">
          <div className="text-green-300 font-mono mb-2">{'>'} STATISTICS:</div>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="font-mono text-green-400">HEADS</div>
              <div className="font-mono text-xl text-green-300">{headsCount}</div>
            </div>
            <div>
              <div className="font-mono text-green-400">TAILS</div>
              <div className="font-mono text-xl text-green-300">{tailsCount}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoinToss;
