import React from 'react';
import { User } from '../types';

interface HeaderProps {
  user: User;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
             <svg className="w-8 h-8 text-brand-primary" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z M12 6C9.24 6 7 8.24 7 11C7 12.76 7.85 14.28 9.09 15.17C9.53 15.48 10.04 15.66 10.58 15.75L12 18L13.42 15.75C13.96 15.66 14.47 15.48 14.91 15.17C16.15 14.28 17 12.76 17 11C17 8.24 14.76 6 12 6Z"/></svg>
             <span className="text-2xl font-bold ml-2 text-dark-text">Zipo Card</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="hidden sm:block font-medium text-medium-text">Bem-vindo, {user.name.split(' ')[0]}</span>
            <img className="h-10 w-10 rounded-full" src={user.avatar} alt="User avatar" />
             <button onClick={onLogout} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-medium-text" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
             </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;