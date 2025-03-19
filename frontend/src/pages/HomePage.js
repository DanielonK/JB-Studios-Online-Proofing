import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-gray-800">Welcome to JBS Studios</h1>
      <p className="text-gray-600 mt-2">Your one-stop solution for photography bookings & proofing gallery</p>
      <div className="mt-6 space-x-4">
        <Link to="/gallery" className="bg-blue-600 text-white px-6 py-3 rounded shadow hover:bg-blue-700">
          View Gallery
        </Link>
        <Link to="/booking" className="bg-green-600 text-white px-6 py-3 rounded shadow hover:bg-green-700">
          Book a Session
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
