import React from "react";
import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaYoutube,
  FaPinterest,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="text-gray-300 pt-16 pb-8 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand Info */}
        <div className="space-y-4 text-center md:text-left">
          <h2 className="text-2xl font-bold text-purple-400">JBS Studios</h2>
          <p className="text-gray-400 text-sm">
            Capturing life's moments with creativity, passion, and purpose.
          </p>
        </div>

        {/* Newsletter Signup */}
        <div className="space-y-4 text-center">
          <h3 className="text-lg font-semibold text-white">Join Our Newsletter</h3>
          <form className="flex items-center justify-center gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-zinc-800 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 w-48 md:w-60"
            />
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg px-4 py-2 text-sm transition"
            >
              Subscribe
            </button>
          </form>
          <p className="text-xs text-gray-500">No spam. Unsubscribe anytime.</p>
        </div>

        {/* Social Links */}
        <div className="flex flex-col items-center md:items-end space-y-4">
          <h3 className="text-lg font-semibold text-white">Follow Us</h3>
          <div className="flex gap-3">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500">
              <FaInstagram size={20} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
              <FaFacebook size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-sky-400">
              <FaTwitter size={20} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-500">
              <FaYoutube size={20} />
            </a>
            <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-700">
              <FaPinterest size={20} />
            </a>
            <a href="mailto:info@jb-studios.com" className="hover:text-gray-400">
              <FaEnvelope size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-zinc-700 mt-12 pt-6 flex flex-col md:flex-row justify-center items-center gap-6 text-xs text-gray-500">
        <Link to="/terms" className="hover:text-purple-400 transition">
          Terms of Use
        </Link>
        <span>|</span>
        <Link to="/about-us" className="hover:text-purple-400 transition">
          About Us
        </Link>
        <p>© {new Date().getFullYear()} JB Studios. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
