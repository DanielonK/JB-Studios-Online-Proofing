import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaCamera, FaBars, FaTimes } from "react-icons/fa";
import axios from "axios";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [photographyCategories, setPhotographyCategories] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchPhotographyCategories = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/categories?section=Photography");
        setPhotographyCategories(res.data);
      } catch (err) {
        console.error("Failed to load Photography categories", err);
      }
    };

    fetchPhotographyCategories();
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="bg-black text-white p-4 shadow-md fixed w-full top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold flex items-center" onClick={closeMenu}>
          <FaCamera className="mr-2" /> JBS Studios
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8 text-sm uppercase tracking-wide">
          <Link to="/" className={`hover:text-yellow-500 ${location.pathname === "/" ? "text-yellow-500" : ""}`}>Home</Link>

          {/* Photography with Dropdown */}
          <div className="relative group">
            <button className="hover:text-yellow-500 focus:outline-none uppercase">
              Photography
            </button>
            <div className="absolute left-0 mt-2 w-48 bg-black text-white rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50">
              {photographyCategories.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/photography/${cat.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="block px-4 py-2 hover:bg-gray-800"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>

          <Link to="/wedding-film" className={`hover:text-yellow-500 ${location.pathname === "/wedding-film" ? "text-yellow-500" : ""}`}>Wedding Film</Link>
          <Link to="/pricing" className={`hover:text-yellow-500 ${location.pathname === "/pricing" ? "text-yellow-500" : ""}`}>Pricing</Link>
          <Link to="/contact" className={`hover:text-yellow-500 ${location.pathname === "/contact" ? "text-yellow-500" : ""}`}>Contact</Link>
          <Link to="/education" className={`hover:text-yellow-500 ${location.pathname === "/education" ? "text-yellow-500" : ""}`}>Education</Link>
          <Link to="/shop" className={`hover:text-yellow-500 ${location.pathname === "/shop" ? "text-yellow-500" : ""}`}>Shop</Link>
          <Link to="/bio" className={`hover:text-yellow-500 ${location.pathname === "/bio" ? "text-yellow-500" : ""}`}>Bio</Link>
        </div>

        {/* Mobile Menu Icon */}
        <button
          className="md:hidden text-white text-2xl focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-black p-4 space-y-4 text-center transition-all duration-300 ease-in-out">
          <Link to="/" className="block hover:text-yellow-500 uppercase" onClick={closeMenu}>Home</Link>

          <div className="block">
            <button className="block w-full text-left hover:text-yellow-500 focus:outline-none uppercase" onClick={() => setMenuOpen(!menuOpen)}>
              Photography
            </button>
            <div className="ml-4">
              {photographyCategories.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/photography/${cat.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="block text-sm hover:text-yellow-300"
                  onClick={closeMenu}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>

          <Link to="/wedding-film" className="block hover:text-yellow-500 uppercase" onClick={closeMenu}>Wedding Film</Link>
          <Link to="/pricing" className="block hover:text-yellow-500 uppercase" onClick={closeMenu}>Pricing</Link>
          <Link to="/contact" className="block hover:text-yellow-500 uppercase" onClick={closeMenu}>Contact</Link>
          <Link to="/education" className="block hover:text-yellow-500 uppercase" onClick={closeMenu}>Education</Link>
          <Link to="/shop" className="block hover:text-yellow-500 uppercase" onClick={closeMenu}>Shop</Link>
          <Link to="/bio" className="block hover:text-yellow-500 uppercase" onClick={closeMenu}>Bio</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
