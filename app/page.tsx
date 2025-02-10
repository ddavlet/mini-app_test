'use client'
// import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react';
import Game from './components/Game';

interface UserData {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  language_code: string;
  is_premium: boolean;
}

export default function Home() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    // Import and initialize WebApp only on the client side
    import('@twa-dev/sdk').then((WebApp) => {
      if (WebApp.default.initDataUnsafe.user) {
        setUserData(WebApp.default.initDataUnsafe.user as UserData);
      }
    });
  }, []);

  const handleGameOver = (score: number) => {
    if (score > highScore) {
      setHighScore(score);
    }
  };

  const simplifiedUserData = userData ? {
    first_name: userData.first_name,
    username: userData.username,
    is_premium: userData.is_premium
  } : null;

  return (
    <div>
      <div className="fixed top-0 left-0 right-0 z-10 bg-black bg-opacity-50 p-4">
        {userData && (
          <div className="text-white">
            <h1 className="text-xl font-bold">{userData.first_name}</h1>
            <p className="text-sm">High Score: {highScore}</p>
          </div>
        )}
      </div>

      <Game
        onGameOver={handleGameOver}
        userData={simplifiedUserData}
      />
    </div>
  );
}
