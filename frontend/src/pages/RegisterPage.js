import React, { useState } from 'react';
import { registerUser } from '../api';

const RegisterPage = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      await registerUser(form);
      alert('User registered! Now login.');
    } catch (error) {
      alert(error.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <h2 className="text-3xl font-bold">Register</h2>
      <input
        type="text"
        name="name"
        placeholder="Name"
        className="mt-4 p-2 border rounded"
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="mt-2 p-2 border rounded"
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        className="mt-2 p-2 border rounded"
        onChange={handleChange}
      />
      <button onClick={handleRegister} className="mt-4 bg-green-600 text-white px-4 py-2 rounded">
        Register
      </button>
    </div>
  );
};

export default RegisterPage;
