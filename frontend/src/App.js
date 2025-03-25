import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"; // Import the Navbar
import HomePage from "./pages/HomePage";
import GalleryPage from "./pages/GalleryPage";
import BookingPage from "./pages/BookingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminDashboard from "./pages/AdminDashboard"; // ✅ Import Admin Dashboard
import PrivateRoute from "./components/PrivateRoute"; // ✅ Ensure only admins access it

// Import Tailwind CSS
import "./index.css";

function App() {
  return (
    <Router>
      <Navbar /> {/* ✅ Navbar is now included at the top */}
      <div className="pt-16"> {/* This ensures content is not hidden behind the navbar */}
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Extra Pages */}
          <Route path="/photography" element={<div>Photography Page</div>} />
          <Route path="/wedding-film" element={<div>Wedding Film Page</div>} />
          <Route path="/pricing" element={<div>Pricing Page</div>} />
          <Route path="/contact" element={<div>Contact Page</div>} />
          <Route path="/education" element={<div>Education Page</div>} />
          <Route path="/shop" element={<div>Shop Page</div>} />
          <Route path="/bio" element={<div>Bio Page</div>} />

          {/* ✅ Protected Admin Route */}
          <Route path="/admin" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
