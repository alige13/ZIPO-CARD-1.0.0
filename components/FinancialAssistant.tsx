import React, { useState, useRef, useEffect } from 'react';
import { Transaction, ChatMessage } from '../types';
import { getFinancialAdvice } from '../services/geminiService';

interface FinancialAssistantProps {
    transactions: Transaction[];
}

const FinancialAssistant: React.FC<FinancialAssistantProps> = ({ transactions }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [messages]);
    
    useEffect(() => {
        if(isOpen) {
            setMessages([{ sender: 'ai', text: 'Olá! Como posso ajudar com as suas finanças hoje? Pode pedir-me para resumir os seus gastos.' }]);
        }
    }, [isOpen]);

    const handleSend = async () => {
        if (!userInput.trim()) return;

        const newMessages: ChatMessage[] = [...messages, { sender: 'user', text: userInput }];
        setMessages(newMessages);
        setUserInput('');
        setIsLoading(true);

        const aiResponse = await getFinancialAdvice(userInput, transactions);

        setMessages([...newMessages, { sender: 'ai', text: aiResponse }]);
        setIsLoading(false);
    };
    
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    }

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 bg-brand-primary text-white rounded-full p-4 shadow-lg hover:bg-brand-secondary transition-transform transform hover:scale-110 z-50"
                aria-label="Abrir Assistente Financeiro"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h.5a1.5 1.5 0 010 3h-.5a1 1 0 00-1 1v1.5a1.5 1.5 0 01-3 0V9a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3h.5a1 1 0 001-1V3.5zM3 6.5a1.5 1.5 0 013 0V7a1 1 0 001 1h.5a1.5 1.5 0 010 3h-.5a1 1 0 00-1 1v1.5a1.5 1.5 0 01-3 0V11a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3h.5a1 1 0 001-1V6.5zM15 11.5a1.5 1.5 0 013 0V12a1 1 0 001 1h.5a1.5 1.5 0 010 3h-.5a1 1 0 00-1 1v1.5a1.5 1.5 0 01-3 0V15a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3h.5a1 1 0 001-1v-.5z"/>
                </svg>
            </button>

            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-end justify-end z-50">
                    <div className="bg-white rounded-t-2xl lg:rounded-l-2xl lg:rounded-tr-none shadow-2xl w-full max-w-lg h-[80vh] flex flex-col">
                        <header className="flex items-center justify-between p-4 border-b">
                            <h3 className="text-lg font-bold">Assistente Financeiro</h3>
                            <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-800">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </header>
                        <main className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.map((msg, index) => (
                                <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-xs md:max-w-md p-3 rounded-2xl ${msg.sender === 'user' ? 'bg-brand-primary text-white rounded-br-none' : 'bg-gray-200 text-dark-text rounded-bl-none'}`}>
                                        <p className="text-sm">{msg.text}</p>
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-gray-200 p-3 rounded-2xl rounded-bl-none">
                                        <div className="flex items-center space-x-1">
                                            <span className="h-2 w-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                            <span className="h-2 w-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                            <span className="h-2 w-2 bg-gray-500 rounded-full animate-bounce"></span>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </main>
                        <footer className="p-4 border-t bg-white">
                            <div className="flex items-center space-x-2">
                                <input
                                    type="text"
                                    value={userInput}
                                    onChange={(e) => setUserInput(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Faça uma pergunta..."
                                    className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-primary"
                                    disabled={isLoading}
                                />
                                <button onClick={handleSend} disabled={isLoading || !userInput.trim()} className="bg-brand-primary text-white rounded-full p-3 disabled:bg-gray-300 transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transform rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                    </svg>
                                </button>
                            </div>
                        </footer>
                    </div>
                </div>
            )}
        </>
    );
};

export default FinancialAssistant;