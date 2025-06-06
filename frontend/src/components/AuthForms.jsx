import React, { useState } from 'react';
import axios from 'axios';

const AuthForms = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }
    if (password.length < 8 && !isLogin) {
      setError('Password must be at least 8 characters long for registration.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
        setError('Invalid email format.');
        return;
    }

    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
    const payload = { email, password };

    try {
      const response = await axios.post(`http://localhost:5001${endpoint}`, payload);
      if (isLogin) {
        localStorage.setItem('token', response.data.token);
        setMessage('Login successful! Redirecting...');
        if (onLoginSuccess) onLoginSuccess();
      } else {
        setMessage('Registration successful! Please log in.');
        setIsLogin(true); 
      }
      setEmail('');
      setPassword('');
    } catch (err) {
      setError(err.response?.data?.message || `An error occurred during ${isLogin ? 'login' : 'registration'}.`);
    }
  };

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-2xl border border-neutral-200">
      <h2 className="text-2xl font-semibold text-center text-neutral-700">
        {isLogin ? 'Sign In' : 'Create Account'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-neutral-600 mb-1.5" htmlFor="email">
            Email Address
          </label>
          <input
            className="shadow-sm appearance-none border border-neutral-300 rounded-lg w-full py-2.5 px-3 text-neutral-700 leading-tight focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-600 mb-1.5" htmlFor="password">
            Password
          </label>
          <input
            className="shadow-sm appearance-none border border-neutral-300 rounded-lg w-full py-2.5 px-3 text-neutral-700 leading-tight focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={isLogin ? undefined : 8}
          />
        </div>
        {error && <p className="text-sm text-red-600 bg-red-50 p-3 rounded-md border border-red-200">{error}</p>}
        {message && <p className="text-sm text-green-600 bg-green-50 p-3 rounded-md border border-green-200">{message}</p>}
        <div>
          <button
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 font-medium transition duration-150 ease-in-out"
            type="submit"
          >
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </div>
        <p className="text-center text-sm text-neutral-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
          <button
            type="button"
            className="font-medium text-emerald-600 hover:text-emerald-500 focus:outline-none focus:underline"
            onClick={() => {
              setIsLogin(!isLogin);
              setMessage('');
              setError('');
            }}
          >
            {isLogin ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
      </form>
    </div>
  );
};

export default AuthForms; 