'use client'

import { useState, useEffect } from 'react';
import Score from '@/app/components/Score';
import Image from 'next/image';

interface GameProps {
  onGameOver?: (score: number) => void;
}

export default function Game({ onGameOver }: GameProps) {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30); // 30 seconds game
  const [isGameActive, setIsGameActive] = useState(false);
  const [targetPosition, setTargetPosition] = useState({ x: 50, y: 50 });
  const [showPopup, setShowPopup] = useState(false);

  const startGame = () => {
    setIsGameActive(true);
    setScore(0);
    setTimeLeft(30);
    moveTarget();
  };

  const moveTarget = () => {
    const newX = Math.random() * 80; // Keep within 80% of screen width
    const newY = Math.random() * 70; // Keep within 70% of screen height
    setTargetPosition({ x: newX, y: newY });
  };

  const handleTap = () => {
    if (!isGameActive) return;
    setScore(prev => prev + 1);
    moveTarget();
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isGameActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsGameActive(false);
            onGameOver?.(score);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isGameActive, timeLeft, score, onGameOver]);

  // Popup interval effect
  useEffect(() => {
    const popupInterval = setInterval(() => {
      setShowPopup(true);
    }, 10000); // Show popup every 10 seconds

    return () => clearInterval(popupInterval);
  }, []);

  return (
    <div className="relative w-full h-screen bg-gradient-to-b from-blue-500 to-purple-600 overflow-hidden">
      {!isGameActive ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold text-white mb-8">Tap Game</h1>
          <button
            onClick={startGame}
            className="px-8 py-4 bg-yellow-400 rounded-full text-xl font-bold shadow-lg
                     transform hover:scale-105 transition-transform"
          >
            Start Game
          </button>
        </div>
      ) : (
        <>
          <Score score={score} timeLeft={timeLeft} />
          <div
            className="absolute w-16 h-16 bg-yellow-400 rounded-full shadow-lg cursor-pointer
                     transform hover:scale-105 transition-transform"
            style={{
              left: `${targetPosition.x}%`,
              top: `${targetPosition.y}%`,
            }}
            onClick={handleTap}
          />
        </>
      )}

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg max-w-2xl w-full mx-4">
            <div className="flex justify-end">
              <button
                onClick={() => setShowPopup(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <a
              href="https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg">
                <Image
                  src="https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg"
                  alt="Visit elefant"
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h2 className="text-white text-xl font-bold">Visit ddavlety.com</h2>
                </div>
              </div>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
