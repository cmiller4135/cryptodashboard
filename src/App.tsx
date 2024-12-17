import React, { useState, useEffect } from 'react';
import { Coins } from 'lucide-react';
import { CryptoSelect } from './components/CryptoSelect';
import { CryptoInfo } from './components/CryptoInfo';
import { RateLimitInfo } from './components/RateLimitInfo';
import type { Cryptocurrency } from './types';

function App() {
  const [cryptoList, setCryptoList] = useState<Array<{ id: string; name: string; symbol: string }>>([]);
  const [selectedCrypto, setSelectedCrypto] = useState<string>('');
  const [cryptoData, setCryptoData] = useState<Cryptocurrency | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingCrypto, setIsLoadingCrypto] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [remainingCalls, setRemainingCalls] = useState<number | null>(null);

  useEffect(() => {
    const fetchCryptoList = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false'
        );
        if (!response.ok) throw new Error('Failed to fetch cryptocurrency list');
        
        // Get rate limit info from headers
        const remaining = response.headers.get('x-ratelimit-remaining');
        if (remaining) setRemainingCalls(parseInt(remaining, 10));
        
        const data = await response.json();
        setCryptoList(data.map(({ id, name, symbol }: any) => ({ id, name, symbol })));
      } catch (err) {
        setError('Failed to load cryptocurrencies. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCryptoList();
  }, []);

  useEffect(() => {
    if (!selectedCrypto) {
      setCryptoData(null);
      return;
    }

    const fetchCryptoData = async () => {
      setIsLoadingCrypto(true);
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${selectedCrypto}?localization=false&tickers=false&community_data=false&developer_data=false`
        );
        if (!response.ok) throw new Error('Failed to fetch cryptocurrency data');
        
        // Update rate limit info
        const remaining = response.headers.get('x-ratelimit-remaining');
        if (remaining) setRemainingCalls(parseInt(remaining, 10));
        
        const data = await response.json();
        setCryptoData(data);
      } catch (err) {
        setError('Failed to load cryptocurrency data. Please try again later.');
        setCryptoData(null);
      } finally {
        setIsLoadingCrypto(false);
      }
    };

    fetchCryptoData();
  }, [selectedCrypto]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Coins className="text-blue-500" size={40} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Crypto Dashboard</h1>
          <p className="text-gray-600">Track real-time cryptocurrency prices and market caps</p>
        </div>

        {error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        ) : (
          <div className="space-y-6">
            <CryptoSelect
              value={selectedCrypto}
              onChange={setSelectedCrypto}
              options={cryptoList}
              isLoading={isLoading}
            />
            <CryptoInfo crypto={cryptoData} isLoading={isLoadingCrypto} />
            <RateLimitInfo remainingCalls={remainingCalls} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;