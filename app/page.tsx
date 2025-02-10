'use client'
import WebApp from '@twa-dev/sdk'
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

  useEffect(() => {
    if (WebApp.initDataUnsafe.user) {
      setUserData(WebApp.initDataUnsafe.user as UserData);
    }
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
    </div>
  );
}
