import React from 'react';

interface ActionButtonsProps {
  onAddMoney: () => void;
  onSendMoney: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onAddMoney, onSendMoney }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <button 
        onClick={onAddMoney}
        className="flex flex-col items-center justify-center p-4 bg-brand-accent text-white rounded-2xl shadow-md hover:bg-green-600 transition-colors duration-300 transform hover:-translate-y-1"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        <span className="font-semibold">Adicionar Dinheiro</span>
      </button>
      <button 
        onClick={onSendMoney}
        className="flex flex-col items-center justify-center p-4 bg-white text-dark-text rounded-2xl shadow-md hover:bg-gray-50 transition-colors duration-300 transform hover:-translate-y-1"
      >
         <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
        <span className="font-semibold">Enviar Dinheiro</span>
      </button>
    </div>
  );
};

export default ActionButtons;