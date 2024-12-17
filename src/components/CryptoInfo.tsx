import React from 'react';
import { TrendingUp, DollarSign } from 'lucide-react';
import type { Cryptocurrency } from '../types';

interface CryptoInfoProps {
  crypto: Cryptocurrency | null;
  isLoading: boolean;
}

export function CryptoInfo({ crypto, isLoading }: CryptoInfoProps) {
  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-12 bg-gray-200 rounded-xl"></div>
        <div className="h-12 bg-gray-200 rounded-xl"></div>
      </div>
    );
  }

  if (!crypto) return null;

  const formatUSD = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatMarketCap = (value: number) => {
    if (value >= 1e12) return `${(value / 1e12).toFixed(2)}T`;
    if (value >= 1e9) return `${(value / 1e9).toFixed(2)}B`;
    if (value >= 1e6) return `${(value / 1e6).toFixed(2)}M`;
    return formatUSD(value);
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-200 backdrop-blur-sm bg-white/80">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-green-50 rounded-lg">
            <DollarSign className="text-green-500" size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Current Price</p>
            <p className="text-2xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
              {formatUSD(crypto.market_data.current_price.usd)}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-200 backdrop-blur-sm bg-white/80">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-50 rounded-lg">
            <TrendingUp className="text-blue-500" size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Market Cap</p>
            <p className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
              {formatMarketCap(crypto.market_data.market_cap.usd)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}