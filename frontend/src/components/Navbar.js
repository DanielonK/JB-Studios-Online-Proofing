import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes, FaChevronDown, FaChevronUp } from "react-icons/fa";
import axios from "axios";
import logo from "../images/Jbstudios_logo.jpg";

const Navbar = ({ openBookingModal }) => { // ✅ receive openBookingModal prop
  const [menuOpen, setMenuOpen] = useState(false);
  const [photoDropdownOpen, setPhotoDropdownOpen] = useState(false);
  const [educationDropdownOpen, setEducationDropdownOpen] = useState(false);
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

  const closeMenu = () => {
    setMenuOpen(false);
    setPhotoDropdownOpen(false);
    setEducationDropdownOpen(false);
    document.body.style.overflow = "auto";
  };

  const openMenu = () => {
    setMenuOpen(true);
    document.body.style.overflow = "hidden";
  };

  const linkClass = (path) =>
    `relative group hover:text-purple-400 transition-colors duration-300 ${location.pathname === path ? "text-purple-400" : ""}`;

  return (
    <>
      {/* Overlay */}
      {menuOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={closeMenu}></div>}

      <nav className="bg-black text-white p-4 shadow-md fixed w-full top-0 z-50">
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2" onClick={closeMenu}>
            <img src={logo} alt="Logo" className="w-10 h-10 rounded-full" />
            <span className="text-lg font-bold uppercase tracking-wider text-purple-400">JBS Studios</span>
          </Link>

          {/* Center Navigation */}
          <div className="hidden md:flex space-x-6 text-sm uppercase tracking-wide mx-auto">
            <Link to="/" className={linkClass("/")}>Home</Link>

            <div className="relative group">
              <button className="hover:text-purple-400 transition-colors duration-300 focus:outline-none uppercase">
                Photography
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-black text-white rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50">
                {photographyCategories.map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/photography/${cat.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className="block px-4 py-2 dropdown-link hover:text-purple-400"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link to="/wedding-film" className={linkClass("/wedding-film")}>Wedding Film</Link>

            <div className="relative group">
              <button className="hover:text-purple-400 transition-colors duration-300 focus:outline-none uppercase">
                Education
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-black text-white rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50">
                <Link to="/education/behind-the-scenes" className="block px-4 py-2 dropdown-link hover:text-purple-400">Behind the Scenes</Link>
                <Link to="/education/tutorials" className="block px-4 py-2 dropdown-link hover:text-purple-400">Tutorials</Link>
              </div>
            </div>

            <Link to="/pricing" className={linkClass("/pricing")}>Pricing</Link>
            <Link to="/contact" className={linkClass("/contact")}>Contact</Link>
            <Link to="/shop" className={linkClass("/shop")}>Shop</Link>
            <Link to="/about-us" className={linkClass("/about-us")}>About Us</Link>
          </div>

          {/* Book an Appointment Button */}
          <div className="hidden md:flex items-center space-x-2">
            <button
              onClick={openBookingModal}
              className="flex items-center space-x-2 text-sm uppercase hover:text-purple-400 transition-colors duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 7.5h18M4.5 7.5v11.25A2.25 2.25 0 006.75 21h10.5a2.25 2.25 0 002.25-2.25V7.5M8.25 11.25h7.5" />
              </svg>
              <span>Book an Appointment</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white text-2xl focus:outline-none z-50"
            onClick={menuOpen ? closeMenu : openMenu}
            aria-label="Toggle menu"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Slide-out Sidebar */}
        <div
          className={`fixed top-0 left-0 h-full w-64 bg-black text-white p-6 transform transition-transform duration-300 ease-in-out z-50 ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          {/* Mobile links */}
          <Link to="/" className="block uppercase px-2 py-2 hover:text-purple-400" onClick={closeMenu}>Home</Link>

          <button
            onClick={() => setPhotoDropdownOpen(!photoDropdownOpen)}
            className="w-full flex justify-between items-center uppercase px-2 py-2 hover:text-purple-400"
          >
            Photography {photoDropdownOpen ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}
          </button>
          {photoDropdownOpen && (
            <div className="ml-4">
              {photographyCategories.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/photography/${cat.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="block text-sm px-2 py-1 hover:text-purple-400"
                  onClick={closeMenu}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          )}

          <Link to="/wedding-film" className="block uppercase px-2 py-2 hover:text-purple-400" onClick={closeMenu}>Wedding Film</Link>

          <button
            onClick={() => setEducationDropdownOpen(!educationDropdownOpen)}
            className="w-full flex justify-between items-center uppercase px-2 py-2 hover:text-purple-400"
          >
            Education {educationDropdownOpen ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}
          </button>
          {educationDropdownOpen && (
            <div className="ml-4">
              <Link to="/education/behind-the-scenes" className="block text-sm px-2 py-1 hover:text-purple-400" onClick={closeMenu}>
                Behind the Scenes
              </Link>
              <Link to="/education/tutorials" className="block text-sm px-2 py-1 hover:text-purple-400" onClick={closeMenu}>
                Tutorials
              </Link>
            </div>
          )}

          <Link to="/pricing" className="block uppercase px-2 py-2 hover:text-purple-400" onClick={closeMenu}>Pricing</Link>
          <Link to="/contact" className="block uppercase px-2 py-2 hover:text-purple-400" onClick={closeMenu}>Contact</Link>
          <Link to="/shop" className="block uppercase px-2 py-2 hover:text-purple-400" onClick={closeMenu}>Shop</Link>
          <Link to="/about-us" className="block uppercase px-2 py-2 hover:text-purple-400" onClick={closeMenu}>About Us</Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
