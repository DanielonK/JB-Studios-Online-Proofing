import React from 'react';
import { Link } from 'react-router-dom';
import { FaCamera, FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold flex items-center">
          <FaCamera className="mr-2" /> JBS Studios
        </Link>
        <div className="space-x-6">
          <Link to="/gallery" className="hover:text-gray-300">Gallery</Link>
          <Link to="/booking" className="hover:text-gray-300">Book a Session</Link>
          <Link to="/login" className="hover:text-gray-300 flex items-center">
            <FaUserCircle className="mr-1" /> Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
