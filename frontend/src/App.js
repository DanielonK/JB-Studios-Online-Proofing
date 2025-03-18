import React, { useState, useEffect } from 'react';
import { registerUser, loginUser, getBookings, createBooking } from './api';

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [bookings, setBookings] = useState([]);

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  });

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

  const handleLogin = async () => {
    try {
      const res = await loginUser({ email: form.email, password: form.password });
      setToken(res.data.token);
      localStorage.setItem('token', res.data.token);
      alert('Login successful!');
    } catch (error) {
      alert('Invalid credentials');
    }
  };

  const fetchBookings = async () => {
    try {
      const res = await getBookings(token);
      setBookings(res.data.bookings);
    } catch (error) {
      console.error('Failed to fetch bookings', error);
    }
  };

  const handleBooking = async () => {
    try {
      await createBooking({ date: '2024-03-17', serviceType: 'Photography' }, token);
      alert('Booking created!');
      fetchBookings();
    } catch (error) {
      alert('Failed to create booking');
    }
  };

  useEffect(() => {
    if (token) fetchBookings();
  }, [token]);

  return (
    <div style={{ padding: '20px' }}>
      <h2>JB Studios Client Panel</h2>

      <input type="text" name="name" placeholder="Name" onChange={handleChange} />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} />
      <button onClick={handleRegister}>Register</button>
      <button onClick={handleLogin}>Login</button>

      {token && (
        <>
          <h3>Bookings</h3>
          <button onClick={handleBooking}>Create Booking</button>
          <ul>
            {bookings.map((b) => (
              <li key={b.id}>{b.serviceType} on {b.date}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default App;
