import React from "react";
import { Link } from "react-router-dom";
import ImageCarousel from "../components/ImageCarousel"; // Import the carousel

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/* Carousel */}
      <ImageCarousel />

      {/* Main Content */}
      <div className="text-center mt-10 space-y-4">
        <h1 className="text-4xl font-bold text-gray-800">
          Welcome to JBS Studios
        </h1>
        <p className="text-gray-600">
          Your one-stop solution for photography bookings & proofing gallery
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/gallery" className="btn btn-primary" role="button">
            View Gallery
          </Link>
          <Link to="/booking" className="btn btn-secondary" role="button">
            Book a Session
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
