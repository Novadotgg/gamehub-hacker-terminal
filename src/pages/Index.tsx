
import React, { useState, useEffect } from 'react';
import { Brain, Dice2, Coins, Palette } from 'lucide-react';
import DiceRoller from '../components/games/DiceRoller';
import CoinToss from '../components/games/CoinToss';
import ColorMatching from '../components/games/ColorMatching';
import QuickMath from '../components/games/QuickMath';
import TicTacToe from '../components/games/TicTacToe';
import Hangman from '../components/games/Hangman';
import MemoryGame from '../components/games/MemoryGame';
import GameModal from '../components/GameModal';
import BinaryRain from '../components/BinaryRain';

const Index = () => {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [displayText, setDisplayText] = useState('');
  
  const fullText = 'GameHub';
  
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setDisplayText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);
    
    return () => clearInterval(timer);
  }, []);

  const games = [
    { id: 'dice', name: 'Dice Roller', emoji: '🎲', icon: Dice2, component: DiceRoller },
    { id: 'coin', name: 'Coin Toss', emoji: '🪙', icon: Coins, component: CoinToss },
    { id: 'color', name: 'Color Matching', emoji: '🎨', icon: Palette, component: ColorMatching },
    { id: 'math', name: 'Quick Math Quiz', emoji: '🧮', icon: Brain, component: QuickMath },
    { id: 'tictactoe', name: 'Tic Tac Toe', emoji: '❌⭕', icon: Brain, component: TicTacToe },
    { id: 'hangman', name: 'Hangman', emoji: '🪓', icon: Brain, component: Hangman },
    { id: 'memory', name: 'Memory Card Game', emoji: '🧠', icon: Brain, component: MemoryGame },
  ];

  const openGame = (gameId: string) => {
    setSelectedGame(gameId);
  };

  const closeGame = () => {
    setSelectedGame(null);
  };

  const selectedGameData = games.find(game => game.id === selectedGame);

  return (
    <div className="min-h-screen bg-black text-green-400 relative overflow-hidden">
      <BinaryRain />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-mono font-bold mb-4 typing-effect">
            {displayText}
          </h1>
          <div className="text-green-300 font-mono text-lg">
            <span className="glow-text">{'>'} System Status: ONLINE</span>
          </div>
          <div className="text-green-300 font-mono text-sm mt-2">
            {'>'} Access Level: ADMIN | Games Loaded: {games.length}
          </div>
        </div>

        {/* Terminal Window */}
        <div className="glass-card rounded-lg p-6 max-w-4xl mx-auto">
          <div className="flex items-center mb-4 border-b border-green-400/30 pb-2">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="ml-4 text-green-300 font-mono text-sm">
              terminal@gamehub:~$ ls -la /games/
            </div>
          </div>

          {/* Games Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {games.map((game) => {
              const IconComponent = game.icon;
              return (
                <div
                  key={game.id}
                  onClick={() => openGame(game.id)}
                  className="game-card glass-card p-4 rounded-lg cursor-pointer transition-all duration-300 hover:bg-green-900/20"
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <IconComponent className="w-6 h-6 text-green-400" />
                    <span className="text-2xl">{game.emoji}</span>
                  </div>
                  <h3 className="font-mono text-lg text-green-300 mb-1">{game.name}</h3>
                  <div className="text-green-500 font-mono text-xs">
                    {'>'} Click to execute...
                  </div>
                </div>
              );
            })}
          </div>

          {/* Terminal Footer */}
          <div className="mt-8 pt-4 border-t border-green-400/30">
            <div className="text-green-300 font-mono text-xs">
              <div>{'>'} Total games available: {games.length}</div>
              <div>{'>'} Memory usage: 42.7% | CPU: 13.4% | Network: SECURE</div>
              <div className="text-green-500 glow-text">{'>'} Ready for command input...</div>
            </div>
          </div>
        </div>
      </div>

      {/* Game Modal */}
      {selectedGame && selectedGameData && (
        <GameModal
          isOpen={!!selectedGame}
          onClose={closeGame}
          title={selectedGameData.name}
          game={selectedGameData.component}
        />
      )}
    </div>
  );
};

export default Index;
