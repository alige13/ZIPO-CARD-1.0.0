
import React, { useState } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Header from './components/Header';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({ name: 'Celso Cumba', avatar: 'https://i.pravatar.cc/150?u=celso' });

  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  
  const handleLogout = () => {
    setIsLoggedIn(false);
  }

  return (
    <div className="min-h-screen bg-light-bg font-sans text-dark-text">
      {isLoggedIn ? (
        <>
          <Header user={user} onLogout={handleLogout} />
          <main>
            <Dashboard />
          </main>
        </>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
