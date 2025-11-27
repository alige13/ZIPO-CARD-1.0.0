import React, { useState, useMemo } from 'react';
import VirtualCard from './VirtualCard';
import BalanceDisplay from './BalanceDisplay';
import ActionButtons from './ActionButtons';
import TransactionHistory from './TransactionHistory';
import AddMoneyModal from './AddMoneyModal';
import FinancialAssistant from './FinancialAssistant';
import SetPinModal from './SetPinModal';
import VerifyPinModal from './VerifyPinModal';
import { Transaction } from '../types';
import ShopIcon from './icons/ShopIcon';
import PlusCircleIcon from './icons/PlusCircleIcon';

const initialTransactions: Transaction[] = [
  { id: '1', merchant: 'Supermercado SPAR', amount: 1250.50, discount: 10, date: '2024-07-28', type: 'payment', icon: ShopIcon },
  { id: '2', merchant: 'Recarga Vodacom', amount: 500.00, discount: 10, date: '2024-07-27', type: 'payment', icon: ShopIcon },
  { id: '3', merchant: 'Recarga via M-Pesa', amount: 5000.00, discount: 0, date: '2024-07-26', type: 'top-up', icon: PlusCircleIcon },
  { id: '4', merchant: 'Assinatura Netflix', amount: 850.00, discount: 10, date: '2024-07-25', type: 'payment', icon: ShopIcon },
];

const Dashboard: React.FC = () => {
    const [balance, setBalance] = useState(2389.50);
    const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
    const [isAddMoneyModalOpen, setAddMoneyModalOpen] = useState(false);
    
    // NOTE: In a real application, the PIN should be stored securely (e.g., encrypted)
    // and not held in component state. This is for demonstration purposes only.
    const [pin, setPin] = useState<string | null>(null);
    const [isSetPinModalOpen, setSetPinModalOpen] = useState(false);
    const [isVerifyPinModalOpen, setVerifyPinModalOpen] = useState(false);
    
    const totalDiscounts = useMemo(() => {
        return transactions.reduce((acc, t) => acc + t.discount, 0);
    }, [transactions]);
    
    const handleAddMoney = (amount: number, method: string) => {
        setBalance(prev => prev + amount);
        const newTransaction: Transaction = {
            id: new Date().toISOString(),
            merchant: `Recarga via ${method}`,
            amount: amount,
            discount: 0,
            date: new Date().toISOString().split('T')[0],
            type: 'top-up',
            icon: PlusCircleIcon,
        };
        setTransactions(prev => [newTransaction, ...prev]);
    };

    const handleSetPin = (newPin: string) => {
        setPin(newPin);
        alert('PIN definido com sucesso!');
    };

    const handleSendMoney = () => {
        if (!pin) {
            alert('Por favor, defina um PIN de segurança primeiro no seu cartão virtual.');
            setSetPinModalOpen(true);
        } else {
            setVerifyPinModalOpen(true);
        }
    };
    
    const handleVerifyPin = (enteredPin: string): boolean => {
        if (enteredPin === pin) {
            alert('PIN correto! Transação autorizada com sucesso. (Simulação)');
            return true;
        }
        return false;
    };


    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-8">
                    <VirtualCard onSetPin={() => setSetPinModalOpen(true)} hasPin={!!pin} />
                    <TransactionHistory transactions={transactions} />
                </div>
                
                {/* Right Column */}
                <div className="space-y-8">
                    <BalanceDisplay balance={balance} />
                    <ActionButtons 
                        onAddMoney={() => setAddMoneyModalOpen(true)}
                        onSendMoney={handleSendMoney}
                    />
                    <div className="bg-white p-6 rounded-2xl shadow-md">
                        <h3 className="text-lg font-semibold text-dark-text mb-2">Recompensas de Desconto</h3>
                        <p className="text-medium-text mb-4">Total de descontos acumulados das suas compras.</p>
                        <div className="text-4xl font-bold text-brand-accent">
                            {totalDiscounts.toFixed(2)} <span className="text-2xl text-medium-text">MZN</span>
                        </div>
                        <p className="text-sm text-light-text mt-2">Este valor é enviado automaticamente para a sua conta bancária associada mensalmente.</p>
                    </div>
                </div>
            </div>
            
            <AddMoneyModal
                isOpen={isAddMoneyModalOpen}
                onClose={() => setAddMoneyModalOpen(false)}
                onAddMoney={handleAddMoney}
            />

            <SetPinModal
                isOpen={isSetPinModalOpen}
                onClose={() => setSetPinModalOpen(false)}
                onSetPin={handleSetPin}
                hasPin={!!pin}
            />

            <VerifyPinModal
                isOpen={isVerifyPinModalOpen}
                onClose={() => setVerifyPinModalOpen(false)}
                onVerifyPin={handleVerifyPin}
            />

            <FinancialAssistant transactions={transactions} />
        </div>
    );
}

export default Dashboard;