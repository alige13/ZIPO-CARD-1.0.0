import React, { useState, useEffect } from 'react';

interface VerifyPinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerifyPin: (pin: string) => boolean;
}

const VerifyPinModal: React.FC<VerifyPinModalProps> = ({ isOpen, onClose, onVerifyPin }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setPin('');
      setError('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (onVerifyPin(pin)) {
      onClose();
    } else {
      setError('PIN incorreto. Por favor, tente novamente.');
      setPin('');
    }
  };
  
  const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 4) {
      setPin(value);
      if (error) setError('');
    }
  }
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleConfirm();
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-8 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-2xl font-bold text-dark-text mb-2">Verificação de PIN</h2>
        <p className="text-medium-text mb-6">Insira o seu PIN de 4 dígitos para autorizar a transação.</p>
        
        <div className="mb-4">
            <input
                type="password"
                value={pin}
                onChange={handlePinChange}
                onKeyPress={handleKeyPress}
                placeholder="••••"
                maxLength={4}
                className="w-full text-center tracking-[1em] text-2xl font-bold border-2 border-gray-200 rounded-lg p-3 focus:ring-brand-primary focus:border-brand-primary"
            />
        </div>
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
        
        <button 
          onClick={handleConfirm} 
          className="w-full py-3 px-4 bg-brand-accent text-white font-semibold rounded-lg hover:bg-green-600 transition-colors duration-300 disabled:bg-gray-300"
          disabled={pin.length !== 4}
        >
          Confirmar
        </button>
      </div>
    </div>
  );
};

export default VerifyPinModal;
