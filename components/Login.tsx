import React, { useState } from 'react';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      // In a real app, you'd have actual authentication logic here.
      onLogin();
    } else {
      setError('Por favor, insira o e-mail e a senha.');
    }
  };
  
  const handleCreateAccountClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    alert('Funcionalidade de criação de conta a ser implementada em breve!');
  };

  const handleForgotPasswordClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    alert('Funcionalidade de recuperação de senha a ser implementada em breve!');
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-lg">
        <div className="text-center">
            <div className="flex justify-center items-center mb-4">
                 <svg className="w-12 h-12 text-brand-primary" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z M12 6C9.24 6 7 8.24 7 11C7 12.76 7.85 14.28 9.09 15.17C9.53 15.48 10.04 15.66 10.58 15.75L12 18L13.42 15.75C13.96 15.66 14.47 15.48 14.91 15.17C16.15 14.28 17 12.76 17 11C17 8.24 14.76 6 12 6Z"/></svg>
                <h1 className="text-3xl font-bold ml-2">Zipo Card</h1>
            </div>
          <h2 className="text-xl font-semibold text-medium-text">Bem-vindo de volta!</h2>
          <p className="text-medium-text">Faça login para aceder à sua conta.</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-brand-primary focus:border-brand-primary focus:z-10 sm:text-sm"
                placeholder="Endereço de e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-brand-primary focus:border-brand-primary focus:z-10 sm:text-sm"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && <p className="text-sm text-red-600 text-center">{error}</p>}

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <a href="#" onClick={handleForgotPasswordClick} className="font-medium text-brand-primary hover:text-brand-secondary">
                Esqueceu-se da senha?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-brand-primary hover:bg-brand-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary transition-colors"
            >
              Entrar
            </button>
          </div>
        </form>
         <p className="text-center text-sm text-medium-text">
            Não tem uma conta?{' '}
            <a href="#" onClick={handleCreateAccountClick} className="font-medium text-brand-primary hover:text-brand-secondary">
             Crie uma conta
            </a>
        </p>
      </div>
    </div>
  );
};

export default Login;