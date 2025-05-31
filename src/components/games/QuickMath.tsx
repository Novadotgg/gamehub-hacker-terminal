
import React, { useState, useEffect } from 'react';
import { Brain } from 'lucide-react';

const QuickMath = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);

  const generateQuestion = () => {
    const operations = ['+', '-', '*'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    let num1, num2, result;

    switch (operation) {
      case '+':
        num1 = Math.floor(Math.random() * 50) + 1;
        num2 = Math.floor(Math.random() * 50) + 1;
        result = num1 + num2;
        break;
      case '-':
        num1 = Math.floor(Math.random() * 50) + 10;
        num2 = Math.floor(Math.random() * (num1 - 1)) + 1;
        result = num1 - num2;
        break;
      case '*':
        num1 = Math.floor(Math.random() * 12) + 1;
        num2 = Math.floor(Math.random() * 12) + 1;
        result = num1 * num2;
        break;
      default:
        return;
    }

    setQuestion(`${num1} ${operation} ${num2}`);
    setCorrectAnswer(result);
  };

  const startGame = () => {
    setGameStarted(true);
    setGameEnded(false);
    setScore(0);
    setTimeLeft(30);
    setAnswer('');
    generateQuestion();
  };

  const submitAnswer = () => {
    if (parseInt(answer) === correctAnswer) {
      setScore(score + 1);
    }
    setAnswer('');
    generateQuestion();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && answer) {
      submitAnswer();
    }
  };

  useEffect(() => {
    if (gameStarted && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameEnded(true);
      setGameStarted(false);
    }
  }, [gameStarted, timeLeft]);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="font-mono text-sm text-green-300 mb-2">
          {'>'} SCORE: {score} | TIME: {timeLeft}s | STATUS: {gameStarted ? 'ACTIVE' : 'STANDBY'}
        </div>
      </div>

      {!gameStarted && !gameEnded && (
        <div className="text-center">
          <button
            onClick={startGame}
            className="bg-green-900/30 border border-green-400 text-green-300 px-6 py-3 rounded-lg font-mono hover:bg-green-900/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-400/20"
          >
            <Brain className="w-5 h-5 inline mr-2" />
            START QUIZ
          </button>
        </div>
      )}

      {gameStarted && (
        <div className="space-y-4">
          <div className="glass-card p-6 rounded-lg text-center">
            <div className="text-green-300 font-mono mb-2">{'>'} SOLVE:</div>
            <div className="text-4xl font-bold text-green-400 font-mono mb-4">
              {question} = ?
            </div>
            <input
              type="number"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Your answer"
              className="bg-black border border-green-400 text-green-300 px-4 py-2 rounded font-mono text-center text-xl w-32"
              autoFocus
            />
          </div>

          <div className="text-center">
            <button
              onClick={submitAnswer}
              disabled={!answer}
              className="bg-green-900/30 border border-green-400 text-green-300 px-6 py-2 rounded font-mono hover:bg-green-900/50 transition-all duration-300 disabled:opacity-50"
            >
              SUBMIT
            </button>
          </div>
        </div>
      )}

      {gameEnded && (
        <div className="glass-card p-6 rounded-lg text-center">
          <div className="text-green-300 font-mono mb-2">{'>'} GAME OVER</div>
          <div className="text-3xl font-bold text-green-400 font-mono mb-4">
            FINAL SCORE: {score}
          </div>
          <button
            onClick={startGame}
            className="bg-green-900/30 border border-green-400 text-green-300 px-6 py-2 rounded font-mono hover:bg-green-900/50 transition-all duration-300"
          >
            PLAY AGAIN
          </button>
        </div>
      )}
    </div>
  );
};

export default QuickMath;
