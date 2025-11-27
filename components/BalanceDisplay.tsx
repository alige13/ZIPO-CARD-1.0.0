import React from 'react';

interface BalanceDisplayProps {
  balance: number;
}

const BalanceDisplay: React.FC<BalanceDisplayProps> = ({ balance }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md text-center">
      <h3 className="text-lg font-semibold text-medium-text mb-2">Saldo Atual</h3>
      <div className="text-5xl font-extrabold text-dark-text tracking-tight">
        {balance.toLocaleString('pt-MZ', { style: 'currency', currency: 'MZN' }).replace('MZN', '').trim()}
        <span className="text-3xl font-semibold text-light-text ml-1">MZN</span>
      </div>
    </div>
  );
};

export default BalanceDisplay;