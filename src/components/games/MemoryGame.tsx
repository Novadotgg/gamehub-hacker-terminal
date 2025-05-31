
import React, { useState, useEffect } from 'react';
import { Brain } from 'lucide-react';

interface Card {
  id: number;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const MemoryGame = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);

  const symbols = ['🔒', '🔑', '🛡️', '⚡', '🔥', '💎', '⭐', '🎯'];

  const initializeGame = () => {
    const gameCards: Card[] = [];
    const shuffledSymbols = [...symbols, ...symbols].sort(() => Math.random() - 0.5);
    
    shuffledSymbols.forEach((symbol, index) => {
      gameCards.push({
        id: index,
        value: symbol,
        isFlipped: false,
        isMatched: false,
      });
    });

    setCards(gameCards);
    setFlippedCards([]);
    setMoves(0);
    setGameCompleted(false);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      const firstCard = cards.find(card => card.id === first);
      const secondCard = cards.find(card => card.id === second);

      if (firstCard?.value === secondCard?.value) {
        setCards(prev => prev.map(card => 
          card.id === first || card.id === second 
            ? { ...card, isMatched: true }
            : card
        ));
      }

      setTimeout(() => {
        setCards(prev => prev.map(card => 
          card.isMatched ? card : { ...card, isFlipped: false }
        ));
        setFlippedCards([]);
      }, 1000);

      setMoves(prev => prev + 1);
    }
  }, [flippedCards, cards]);

  useEffect(() => {
    if (cards.length > 0 && cards.every(card => card.isMatched)) {
      setGameCompleted(true);
    }
  }, [cards]);

  const handleCardClick = (cardId: number) => {
    if (flippedCards.length === 2) return;
    
    const card = cards.find(c => c.id === cardId);
    if (card?.isFlipped || card?.isMatched) return;

    setCards(prev => prev.map(c => 
      c.id === cardId ? { ...c, isFlipped: true } : c
    ));
    setFlippedCards(prev => [...prev, cardId]);
  };

  const matchedPairs = cards.filter(card => card.isMatched).length / 2;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="font-mono text-sm text-green-300 mb-2">
          {'>'} MOVES: {moves} | PAIRS: {matchedPairs}/{symbols.length} | STATUS: {gameCompleted ? 'COMPLETE' : 'ACTIVE'}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3 max-w-md mx-auto">
        {cards.map(card => (
          <button
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className={`w-16 h-16 rounded-lg font-mono text-2xl transition-all duration-300 ${
              card.isFlipped || card.isMatched
                ? 'bg-green-900/50 border border-green-400 text-green-300'
                : 'bg-green-900/30 border border-green-400 text-transparent hover:bg-green-900/40'
            }`}
          >
            {(card.isFlipped || card.isMatched) ? card.value : '?'}
          </button>
        ))}
      </div>

      {gameCompleted && (
        <div className="glass-card p-4 rounded-lg text-center">
          <div className="text-green-300 font-mono mb-2">{'>'} MEMORY SCAN COMPLETE</div>
          <div className="text-2xl font-bold text-green-400 font-mono mb-2">
            ACCESS GRANTED!
          </div>
          <div className="text-green-300 font-mono mb-4">
            COMPLETED IN {moves} MOVES
          </div>
          <button
            onClick={initializeGame}
            className="bg-green-900/30 border border-green-400 text-green-300 px-6 py-2 rounded font-mono hover:bg-green-900/50 transition-all duration-300"
          >
            <Brain className="w-5 h-5 inline mr-2" />
            NEW SCAN
          </button>
        </div>
      )}

      <div className="text-center">
        <button
          onClick={initializeGame}
          className="bg-green-900/30 border border-green-400 text-green-300 px-4 py-2 rounded font-mono hover:bg-green-900/50 transition-all duration-300"
        >
          RESET MEMORY
        </button>
      </div>
    </div>
  );
};

export default MemoryGame;
