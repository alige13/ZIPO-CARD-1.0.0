import React from 'react';
import { Transaction } from '../types';

interface TransactionHistoryProps {
  transactions: Transaction[];
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ transactions }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h3 className="text-xl font-bold text-dark-text mb-4">Transações Recentes</h3>
      <div className="space-y-4">
        {transactions.map((t) => (
          <div key={t.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center">
              <div className={`p-3 rounded-full ${t.type === 'payment' ? 'bg-indigo-100 text-brand-primary' : 'bg-green-100 text-brand-accent'}`}>
                <t.icon className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="font-semibold text-dark-text">{t.merchant}</p>
                <p className="text-sm text-medium-text">{new Date(t.date).toLocaleDateString('pt-PT', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
              </div>
            </div>
            <div className="text-right">
                <p className={`font-bold ${t.type === 'payment' ? 'text-red-500' : 'text-green-500'}`}>
                    {t.type === 'payment' ? '-' : '+'} {t.amount.toFixed(2)} MZN
                </p>
                {t.discount > 0 && <p className="text-xs text-brand-accent font-medium">-{t.discount.toFixed(2)} desconto</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionHistory;