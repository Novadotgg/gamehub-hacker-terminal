
import React, { useState, useEffect } from 'react';
import { Palette } from 'lucide-react';

const ColorMatching = () => {
  const [targetColor, setTargetColor] = useState('');
  const [options, setOptions] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [feedback, setFeedback] = useState('');

  const colors = [
    { name: 'RED', value: '#ff0000' },
    { name: 'BLUE', value: '#0000ff' },
    { name: 'GREEN', value: '#00ff00' },
    { name: 'YELLOW', value: '#ffff00' },
    { name: 'PURPLE', value: '#800080' },
    { name: 'ORANGE', value: '#ffa500' },
    { name: 'PINK', value: '#ffc0cb' },
    { name: 'CYAN', value: '#00ffff' },
  ];

  const startGame = () => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setTargetColor(randomColor.name);
    
    const shuffledColors = [...colors].sort(() => Math.random() - 0.5).slice(0, 4);
    if (!shuffledColors.find(c => c.name === randomColor.name)) {
      shuffledColors[0] = randomColor;
    }
    
    setOptions(shuffledColors.map(c => c.name));
    setGameStarted(true);
    setFeedback('');
  };

  const handleColorSelect = (selectedColor: string) => {
    if (selectedColor === targetColor) {
      setScore(score + 1);
      setFeedback('CORRECT! +1 POINT');
      setTimeout(startGame, 1000);
    } else {
      setFeedback('INCORRECT! TRY AGAIN');
    }
  };

  const resetGame = () => {
    setScore(0);
    setGameStarted(false);
    setFeedback('');
  };

  const getColorValue = (colorName: string) => {
    return colors.find(c => c.name === colorName)?.value || '#ffffff';
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="font-mono text-sm text-green-300 mb-2">
          {'>'} SCORE: {score} | STATUS: {gameStarted ? 'ACTIVE' : 'STANDBY'}
        </div>
      </div>

      {!gameStarted ? (
        <div className="text-center">
          <button
            onClick={startGame}
            className="bg-green-900/30 border border-green-400 text-green-300 px-6 py-3 rounded-lg font-mono hover:bg-green-900/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-400/20"
          >
            <Palette className="w-5 h-5 inline mr-2" />
            INITIALIZE GAME
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="glass-card p-4 rounded-lg text-center">
            <div className="text-green-300 font-mono mb-2">{'>'} TARGET COLOR:</div>
            <div className="text-2xl font-bold text-green-400 font-mono">
              {targetColor}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {options.map((colorName, index) => (
              <button
                key={index}
                onClick={() => handleColorSelect(colorName)}
                className="glass-card p-4 rounded-lg hover:bg-green-900/20 transition-all duration-300 border hover:border-green-400"
                style={{
                  backgroundColor: `${getColorValue(colorName)}20`,
                  borderColor: getColorValue(colorName),
                }}
              >
                <div
                  className="w-12 h-12 mx-auto rounded mb-2"
                  style={{ backgroundColor: getColorValue(colorName) }}
                ></div>
                <div className="font-mono text-sm text-green-300">{colorName}</div>
              </button>
            ))}
          </div>

          {feedback && (
            <div className={`text-center font-mono font-bold ${feedback.includes('CORRECT') ? 'text-green-400' : 'text-red-400'}`}>
              {'>'} {feedback}
            </div>
          )}

          <div className="text-center">
            <button
              onClick={resetGame}
              className="bg-red-900/30 border border-red-400 text-red-300 px-4 py-2 rounded font-mono hover:bg-red-900/50 transition-all duration-300"
            >
              RESET GAME
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorMatching;
