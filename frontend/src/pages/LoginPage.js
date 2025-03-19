import React, { useState } from 'react';
import { loginUser } from '../api';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const res = await loginUser({ email, password });
      localStorage.setItem('token', res.data.token);
      alert('Login successful!');
    } catch (error) {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <h2 className="text-3xl font-bold">Login</h2>
      <input
        type="email"
        placeholder="Email"
        className="mt-4 p-2 border rounded"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="mt-2 p-2 border rounded"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
        Login
      </button>
    </div>
  );
};

export default LoginPage;
