import React from 'react';
import { ChevronDown } from 'lucide-react';

interface CryptoSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: Array<{ id: string; name: string; symbol: string }>;
  isLoading: boolean;
}

export function CryptoSelect({ value, onChange, options, isLoading }: CryptoSelectProps) {
  return (
    <div className="relative max-w-md mx-auto">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl px-4 py-3 pr-10 
                 shadow-lg hover:shadow-xl transition-shadow duration-200
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                 disabled:bg-gray-100"
        disabled={isLoading}
      >
        <option value="">Select a cryptocurrency</option>
        {options.map((crypto) => (
          <option key={crypto.id} value={crypto.id}>
            {crypto.name} ({crypto.symbol.toUpperCase()})
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
    </div>
  );
}