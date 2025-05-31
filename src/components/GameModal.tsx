
import React from 'react';
import { X } from 'lucide-react';

interface GameModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  game: React.ComponentType;
}

const GameModal: React.FC<GameModalProps> = ({ isOpen, onClose, title, game: GameComponent }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative glass-card rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6 border-b border-green-400/30 pb-4">
          <h2 className="text-2xl font-mono text-green-300 glow-text">
            {'>'} {title}
          </h2>
          <button
            onClick={onClose}
            className="text-green-400 hover:text-green-300 transition-colors p-1 hover:bg-green-900/20 rounded"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="text-green-400">
          <GameComponent />
        </div>
      </div>
    </div>
  );
};

export default GameModal;
