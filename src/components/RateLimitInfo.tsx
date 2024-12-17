import React from 'react';
import { AlertCircle } from 'lucide-react';

interface RateLimitInfoProps {
  remainingCalls: number | null;
}

export function RateLimitInfo({ remainingCalls }: RateLimitInfoProps) {
  if (remainingCalls === null) return null;

  return (
    <div className="max-w-md mx-auto flex items-center gap-2 text-sm text-gray-600 bg-white/80 backdrop-blur-sm rounded-xl p-3 shadow-md border border-gray-100">
      <AlertCircle size={16} className="text-blue-500" />
      <span>API Calls Remaining: {remainingCalls}/30 per minute</span>
    </div>
  );
}