import React, { useState } from 'react';
import CardChipIcon from './icons/CardChipIcon';
import WifiIcon from './icons/WifiIcon';

interface VirtualCardProps {
    onSetPin: () => void;
    hasPin: boolean;
}

const VirtualCard: React.FC<VirtualCardProps> = ({ onSetPin, hasPin }) => {
    const [showDetails, setShowDetails] = useState(false);
    
    const cardNumber = showDetails ? "4567 8901 2345 6789" : "**** **** **** 6789";
    const expiryDate = showDetails ? "12/28" : "**/**";
    const cvv = showDetails ? "789" : "***";

    return (
        <div 
            className="p-6 rounded-2xl shadow-2xl text-white relative overflow-hidden transition-transform transform hover:scale-105 duration-300 bg-gradient-to-br from-brand-primary to-brand-secondary"
        >
            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-10 backdrop-blur-sm"></div>
            <div className="relative z-10 flex flex-col justify-between h-56">
                <div>
                    <div className="flex justify-between items-start">
                        <h2 className="text-2xl font-bold">Zipo Card</h2>
                        <WifiIcon className="w-8 h-8"/>
                    </div>
                     <CardChipIcon className="mt-4" />
                </div>
                
                <div className="space-y-3">
                    <div className="text-2xl font-mono tracking-widest text-center">
                        {cardNumber}
                    </div>
                    <div className="flex justify-between items-end">
                        <div>
                            <p className="text-xs uppercase opacity-70">Titular do Cartão</p>
                            <p className="font-medium">Celso Cumba</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="text-right">
                                <p className="text-xs uppercase opacity-70">Expira em</p>
                                <p className="font-medium font-mono">{expiryDate}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs uppercase opacity-70">CVV</p>
                                <p className="font-medium font-mono">{cvv}</p>
                            </div>
                        </div>
                         <div className="flex flex-col space-y-1">
                            <button onClick={() => setShowDetails(!showDetails)} className="text-xs px-3 py-1 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition">
                                {showDetails ? 'Ocultar' : 'Mostrar'}
                            </button>
                             <button onClick={onSetPin} className="text-xs px-3 py-1 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition">
                                {hasPin ? 'Alterar PIN' : 'Definir PIN'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VirtualCard;