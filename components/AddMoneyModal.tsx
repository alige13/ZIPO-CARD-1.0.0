import React, { useState } from 'react';
import MpesaIcon from './icons/MpesaIcon';
import EmolaIcon from './icons/EmolaIcon';
import MkeshIcon from './icons/MkeshIcon';

interface AddMoneyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMoney: (amount: number, method: string) => void;
}

const AddMoneyModal: React.FC<AddMoneyModalProps> = ({ isOpen, onClose, onAddMoney }) => {
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleAdd = (method: string) => {
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      setError('Por favor, insira um valor válido.');
      return;
    }
    onAddMoney(numericAmount, method);
    setAmount('');
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-2xl font-bold text-dark-text mb-4">Adicionar Dinheiro</h2>
        <p className="text-medium-text mb-6">Insira o valor e escolha o seu método de recarga preferido.</p>
        
        <div className="relative mb-4">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-lg font-semibold text-gray-500">MZN</span>
            <input
                type="number"
                value={amount}
                onChange={(e) => {
                    setAmount(e.target.value);
                    if (error) setError('');
                }}
                placeholder="0.00"
                className="w-full pl-14 pr-4 py-3 text-2xl font-bold border-2 border-gray-200 rounded-lg focus:ring-brand-primary focus:border-brand-primary"
            />
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        
        <div className="space-y-4">
            <p className="text-sm font-semibold text-medium-text">Selecione o Método:</p>
            <button onClick={() => handleAdd('M-Pesa')} className="w-full flex items-center justify-center p-3 border rounded-lg hover:bg-gray-50 transition">
                <MpesaIcon className="h-8"/>
            </button>
            <button onClick={() => handleAdd('e-Mola')} className="w-full flex items-center justify-center p-3 border rounded-lg hover:bg-gray-50 transition">
                 <EmolaIcon className="h-8"/>
            </button>
             <button onClick={() => handleAdd('mKesh')} className="w-full flex items-center justify-center p-3 border rounded-lg hover:bg-gray-50 transition">
                 <MkeshIcon className="h-8"/>
            </button>
        </div>
      </div>
    </div>
  );
};

export default AddMoneyModal;