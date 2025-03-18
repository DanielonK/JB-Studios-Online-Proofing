import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Backend URL

// User Authentication APIs
export const registerUser = async (userData) => {
  return await axios.post(`${API_URL}/users/register`, userData);
};

export const loginUser = async (userData) => {
  return await axios.post(`${API_URL}/users/login`, userData);
};

// Booking APIs
export const createBooking = async (bookingData, token) => {
  return await axios.post(`${API_URL}/bookings`, bookingData, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const getBookings = async (token) => {
  return await axios.get(`${API_URL}/bookings`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};
