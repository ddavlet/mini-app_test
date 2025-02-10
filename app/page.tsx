'use client'
// import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react';

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
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Import and initialize WebApp only on the client side
    import('@twa-dev/sdk').then((WebApp) => {
      if (WebApp.default.initDataUnsafe.user) {
        setUserData(WebApp.default.initDataUnsafe.user as UserData);
      }
    });

    // New popup interval
    const intervalId = setInterval(() => {
      setShowPopup(true);
    }, 10000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <main className="p-4">
        {
          userData ? (
            <div>
              <h1 className="text-2xl font-bold">{userData.first_name}</h1>
              <ul>
                <li>ID: {userData.id}</li>
                <li>Username: {userData.username}</li>
                <li>Language: {userData.language_code}</li>
                <li>Premium: {userData.is_premium ? 'Yes' : 'No'}</li>
              </ul>
            </div>
          ) : (
            <div>
              <h1>Loading...</h1>
            </div>
          )
        }
      </main>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg shadow-lg max-w-2xl w-full">
            <div className="flex justify-end">
              <button
                onClick={() => setShowPopup(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <a
              href="https://ddavlety.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg">
                <img
                  src="https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg"
                  alt="Visit ddavlety.com"
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
