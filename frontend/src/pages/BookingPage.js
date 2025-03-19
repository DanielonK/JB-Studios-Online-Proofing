import React, { useState } from 'react';
import { createBooking } from '../api';

const BookingPage = () => {
  const [date, setDate] = useState('');
  const [serviceType, setServiceType] = useState('');
  const token = localStorage.getItem('token');

  const handleBooking = async () => {
    try {
      await createBooking({ date, serviceType }, token);
      alert('Booking successful!');
    } catch (error) {
      alert('Booking failed');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold">Book a Photography Session</h2>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="mt-4 p-2 border rounded" />
      <select value={serviceType} onChange={(e) => setServiceType(e.target.value)} className="mt-4 p-2 border rounded">
        <option value="">Select a service</option>
        <option value="Portrait">Portrait</option>
        <option value="Wedding">Wedding</option>
        <option value="Event">Event</option>
      </select>
      <button onClick={handleBooking} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
        Confirm Booking
      </button>
    </div>
  );
};

export default BookingPage;