import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForms from '../components/AuthForms'; // Corrected path

const AuthPage = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    navigate('/'); // Redirect to homepage or dashboard after login
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-emerald-700">
          Kitchen Navigator
        </h1>
        <p className="mt-2 text-neutral-600">Welcome! Please sign in or create an account.</p>
      </div>
      <AuthForms onLoginSuccess={handleLoginSuccess} />
      <footer className="text-center py-8 mt-12 text-neutral-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Kitchen Navigator. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AuthPage; 