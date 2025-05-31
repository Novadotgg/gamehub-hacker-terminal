
import React, { useState, useEffect } from 'react';
import { Brain } from 'lucide-react';

const Hangman = () => {
  const words = ['TERMINAL', 'HACKER', 'MATRIX', 'BINARY', 'SYSTEM', 'NETWORK', 'SECURE', 'ACCESS'];
  const [currentWord, setCurrentWord] = useState('');
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');

  const maxWrongGuesses = 6;

  const startNewGame = () => {
    const word = words[Math.floor(Math.random() * words.length)];
    setCurrentWord(word);
    setGuessedLetters([]);
    setWrongGuesses(0);
    setGameStatus('playing');
  };

  useEffect(() => {
    startNewGame();
  }, []);

  useEffect(() => {
    if (currentWord) {
      const hasWon = currentWord.split('').every(letter => guessedLetters.includes(letter));
      if (hasWon) {
        setGameStatus('won');
      } else if (wrongGuesses >= maxWrongGuesses) {
        setGameStatus('lost');
      }
    }
  }, [guessedLetters, wrongGuesses, currentWord]);

  const guessLetter = (letter: string) => {
    if (guessedLetters.includes(letter) || gameStatus !== 'playing') return;

    const newGuessedLetters = [...guessedLetters, letter];
    setGuessedLetters(newGuessedLetters);

    if (!currentWord.includes(letter)) {
      setWrongGuesses(wrongGuesses + 1);
    }
  };

  const displayWord = () => {
    return currentWord.split('').map(letter => 
      guessedLetters.includes(letter) ? letter : '_'
    ).join(' ');
  };

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  const hangmanStages = [
    '',
    '  |\n  |',
    '  +---+\n  |   |\n      |',
    '  +---+\n  |   |\n  O   |',
    '  +---+\n  |   |\n  O   |\n  |   |',
    '  +---+\n  |   |\n  O   |\n /|   |',
    '  +---+\n  |   |\n  O   |\n /|\\  |\n /    |',
    '  +---+\n  |   |\n  O   |\n /|\\  |\n / \\  |'
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="font-mono text-sm text-green-300 mb-2">
          {'>'} WRONG: {wrongGuesses}/{maxWrongGuesses} | STATUS: {gameStatus.toUpperCase()}
        </div>
      </div>

      <div className="glass-card p-4 rounded-lg">
        <div className="text-center mb-4">
          <div className="font-mono text-green-300 text-xs mb-2">{'>'} HANGMAN STATUS:</div>
          <pre className="text-green-400 font-mono text-sm">
            {hangmanStages[wrongGuesses]}
          </pre>
        </div>
      </div>

      <div className="glass-card p-4 rounded-lg text-center">
        <div className="text-green-300 font-mono mb-2">{'>'} WORD:</div>
        <div className="text-3xl font-bold text-green-400 font-mono tracking-wider">
          {displayWord()}
        </div>
      </div>

      {gameStatus === 'playing' && (
        <div className="space-y-4">
          <div className="text-green-300 font-mono text-sm text-center">
            {'>'} SELECT LETTER:
          </div>
          <div className="grid grid-cols-6 gap-2">
            {alphabet.map(letter => (
              <button
                key={letter}
                onClick={() => guessLetter(letter)}
                disabled={guessedLetters.includes(letter)}
                className={`p-2 rounded font-mono text-sm transition-all duration-300 ${
                  guessedLetters.includes(letter)
                    ? currentWord.includes(letter)
                      ? 'bg-green-900/50 border border-green-400 text-green-400'
                      : 'bg-red-900/50 border border-red-400 text-red-400'
                    : 'bg-green-900/30 border border-green-400 text-green-300 hover:bg-green-900/50'
                }`}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>
      )}

      {gameStatus !== 'playing' && (
        <div className="glass-card p-4 rounded-lg text-center">
          <div className="text-green-300 font-mono mb-2">{'>'} GAME OVER</div>
          <div className={`text-2xl font-bold font-mono mb-2 ${
            gameStatus === 'won' ? 'text-green-400' : 'text-red-400'
          }`}>
            {gameStatus === 'won' ? 'ACCESS GRANTED!' : 'ACCESS DENIED!'}
          </div>
          <div className="text-green-300 font-mono mb-4">
            WORD: {currentWord}
          </div>
          <button
            onClick={startNewGame}
            className="bg-green-900/30 border border-green-400 text-green-300 px-6 py-2 rounded font-mono hover:bg-green-900/50 transition-all duration-300"
          >
            <Brain className="w-5 h-5 inline mr-2" />
            NEW WORD
          </button>
        </div>
      )}
    </div>
  );
};

export default Hangman;
