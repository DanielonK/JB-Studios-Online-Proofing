import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaCamera, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-black text-white p-4 shadow-md fixed w-full top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold flex items-center">
          <FaCamera className="mr-2" /> JBS Studios
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8 text-sm uppercase tracking-wide">
          <Link to="/" className="hover:text-yellow-500">Home</Link>
          <Link to="/photography" className="hover:text-yellow-500">Photography</Link>
          <Link to="/wedding-film" className="hover:text-yellow-500">Wedding Film</Link>
          <Link to="/pricing" className="hover:text-yellow-500">Pricing</Link>
          <Link to="/contact" className="hover:text-yellow-500">Contact</Link>
          <Link to="/education" className="hover:text-yellow-500">Education</Link>
          <Link to="/shop" className="hover:text-yellow-500">Shop</Link>
          <Link to="/bio" className="hover:text-yellow-500">Bio</Link>
        </div>

        {/* Mobile Menu Icon */}
        <button
          className="md:hidden text-white text-2xl focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-black p-4 space-y-4 text-center">
          <Link to="/" className="block hover:text-yellow-500" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/photography" className="block hover:text-yellow-500" onClick={() => setMenuOpen(false)}>Photography</Link>
          <Link to="/wedding-film" className="block hover:text-yellow-500" onClick={() => setMenuOpen(false)}>Wedding Film</Link>
          <Link to="/pricing" className="block hover:text-yellow-500" onClick={() => setMenuOpen(false)}>Pricing</Link>
          <Link to="/contact" className="block hover:text-yellow-500" onClick={() => setMenuOpen(false)}>Contact</Link>
          <Link to="/education" className="block hover:text-yellow-500" onClick={() => setMenuOpen(false)}>Education</Link>
          <Link to="/shop" className="block hover:text-yellow-500" onClick={() => setMenuOpen(false)}>Shop</Link>
          <Link to="/bio" className="block hover:text-yellow-500" onClick={() => setMenuOpen(false)}>Bio</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
