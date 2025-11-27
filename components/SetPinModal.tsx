import React, { useState } from 'react';

interface SetPinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSetPin: (pin: string) => void;
  hasPin: boolean;
}

const SetPinModal: React.FC<SetPinModalProps> = ({ isOpen, onClose, onSetPin, hasPin }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSave = () => {
    if (!/^\d{4}$/.test(pin)) {
      setError('O PIN deve ter exatamente 4 dígitos numéricos.');
      return;
    }
    onSetPin(pin);
    setPin('');
    setError('');
    onClose();
  };

  const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 4) {
      setPin(value);
      if (error) setError('');
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
        <h2 className="text-2xl font-bold text-dark-text mb-2">{hasPin ? 'Alterar PIN' : 'Definir PIN de Segurança'}</h2>
        <p className="text-medium-text mb-6">O seu PIN de 4 dígitos será usado para autorizar transações.</p>
        
        <div className="mb-4">
            <input
                type="password"
                value={pin}
                onChange={handlePinChange}
                placeholder="••••"
                maxLength={4}
                className="w-full text-center tracking-[1em] text-2xl font-bold border-2 border-gray-200 rounded-lg p-3 focus:ring-brand-primary focus:border-brand-primary"
                autoComplete="new-password"
            />
        </div>
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
        
        <button 
          onClick={handleSave} 
          className="w-full py-3 px-4 bg-brand-primary text-white font-semibold rounded-lg hover:bg-brand-secondary transition-colors duration-300 disabled:bg-gray-300"
          disabled={pin.length !== 4}
        >
          Guardar PIN
        </button>
      </div>
    </div>
  );
};

export default SetPinModal;
