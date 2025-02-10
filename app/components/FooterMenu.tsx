'use client'

import { useState } from 'react';

interface FooterMenuProps {
  score: number;
  coins: number;
  onExchangePoints: (points: number) => void;
  userData: {
    first_name: string;
    username: string;
    is_premium: boolean;
  } | null;
}

export default function FooterMenu({ score, coins, onExchangePoints, userData }: FooterMenuProps) {
  const [activeTab, setActiveTab] = useState('scores');
  const [exchangeAmount, setExchangeAmount] = useState(100); // Default exchange amount

  const renderContent = () => {
    switch (activeTab) {
      case 'scores':
        return (
          <div className="p-4">
            <h3 className="text-lg font-bold mb-2">Your Stats</h3>
            <div className="space-y-2">
              <p>Current Score: {score}</p>
              <p>Total Coins: {coins}</p>
            </div>
          </div>
        );
      case 'profile':
        return (
          <div className="p-4">
            {userData ? (
              <div className="space-y-2">
                <h3 className="text-lg font-bold mb-2">{userData.first_name}&apos;s Profile</h3>
                <p>Username: {userData.username}</p>
                <p>Status: {userData.is_premium ? 'Premium' : 'Standard'}</p>
              </div>
            ) : (
              <p>Loading profile...</p>
            )}
          </div>
        );
      case 'wallet':
        return (
          <div className="p-4">
            <h3 className="text-lg font-bold mb-2">Wallet</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p>Available Points: {score}</p>
                <p>Current Coins: {coins}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Exchange Points for Coins</p>
                <div className="flex gap-2">
                  <select
                    value={exchangeAmount}
                    onChange={(e) => setExchangeAmount(Number(e.target.value))}
                    className="px-3 py-2 border rounded-lg"
                  >
                    <option value={100}>100 points</option>
                    <option value={500}>500 points</option>
                    <option value={1000}>1000 points</option>
                  </select>
                  <button
                    onClick={() => onExchangePoints(exchangeAmount)}
                    disabled={score < exchangeAmount}
                    className={`px-4 py-2 rounded-lg ${
                      score < exchangeAmount
                        ? 'bg-gray-300 cursor-not-allowed'
                        : 'bg-yellow-400 hover:bg-yellow-500'
                    }`}
                  >
                    Exchange
                  </button>
                </div>
                <p className="text-xs text-gray-500">
                  Exchange rate: 100 points = 1 coin
                </p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg rounded-t-xl">
      {renderContent()}
      <div className="flex justify-around border-t">
        <button
          onClick={() => setActiveTab('scores')}
          className={`flex-1 p-4 ${activeTab === 'scores' ? 'text-yellow-500 font-bold' : ''}`}
        >
          Scores
        </button>
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex-1 p-4 ${activeTab === 'profile' ? 'text-yellow-500 font-bold' : ''}`}
        >
          Profile
        </button>
        <button
          onClick={() => setActiveTab('wallet')}
          className={`flex-1 p-4 ${activeTab === 'wallet' ? 'text-yellow-500 font-bold' : ''}`}
        >
          Wallet
        </button>
      </div>
    </div>
  );
}
