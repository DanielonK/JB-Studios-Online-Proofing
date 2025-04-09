import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Components
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import BookingModal from "./components/BookingModal";
import ScrollToTop from "./components/ScrollToTop";
import BackToTopButton from "./components/BackToTopButton";

// Pages
import HomePage from "./pages/HomePage";
import GalleryPage from "./pages/GalleryPage";
import BookingPage from "./pages/BookingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminDashboard from "./pages/AdminDashboard";
import CategoryGalleryPage from "./pages/CategoryGalleryPage";
import WeddingFilmPage from "./pages/WeddingFilmPage";
import PricingPage from "./pages/PricingPage";
import ContactPage from "./pages/ContactPage";
import BehindTheScenesPage from "./pages/BehindTheScenesPage";
import TutorialsPage from "./pages/TutorialsPage";
import AboutUsPage from "./pages/AboutUsPage";
import TermsPage from "./pages/TermsPage";

// Admin Layout (⭐️ NEW ⭐️)
import AdminLayout from "./components/AdminLayout";

import "./index.css";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/photography" element={<div>Photography Page</div>} />
        <Route path="/wedding-film" element={<WeddingFilmPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/shop" element={<div>Shop Page</div>} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/education/behind-the-scenes" element={<BehindTheScenesPage />} />
        <Route path="/education/tutorials" element={<TutorialsPage />} />
        <Route path="/:section/:category" element={<CategoryGalleryPage />} />

        {/* Admin Route ✅ */}
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminDashboard /> {/* ⬅️ No AdminLayout here anymore! */}
            </PrivateRoute>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const location = useLocation(); // 👈 get current location

  const isAdminPage = location.pathname.startsWith("/admin"); // 👈 detect if we're on /admin

  return (
    <>
      {/* Only show Navbar & BackToTopButton if not on /admin */}
      {!isAdminPage && (
        <>
          <Navbar openBookingModal={() => setIsBookingModalOpen(true)} />
          <BackToTopButton />
        </>
      )}

      <div className={isAdminPage ? "" : "pt-16"}>
        <AnimatedRoutes />
      </div>

      {/* Booking Modal only if not admin */}
      {!isAdminPage && (
        <BookingModal
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
        />
      )}
    </>
  );
}

export default function RootApp() {
  return (
    <Router>
      <ScrollToTop />
      <App />
    </Router>
  );
}
