import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // ✅ Auto-redirect if already logged in
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.role) {
      navigate(storedUser.role === 'admin' ? '/admin' : '/');
    }
  }, [navigate]);

  const handleLogin = async () => {
    try {
      const res = await loginUser({ email, password });
      console.log('Login response:', res.data); // 🔍 Debugging

      if (res.data.token && res.data.user) {
        // ✅ Save token and user info
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));

        alert('Login successful!');

        // ✅ Redirect based on user role
        navigate(res.data.user.role === 'admin' ? '/admin' : '/');
      } else {
        alert('Login failed: missing token or user info');
      }
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
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="mt-2 p-2 border rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleLogin}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Login
      </button>
    </div>
  );
};

export default LoginPage;
