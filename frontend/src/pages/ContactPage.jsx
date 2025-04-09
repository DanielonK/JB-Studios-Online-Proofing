import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "../components/Footer"; // ✅ Import Footer

const ContactPage = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: "ease-in-out" });
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black text-white px-6 py-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          {/* Left Info Section */}
          <div data-aos="fade-right">
            <h1 className="text-4xl md:text-5xl font-bold text-purple-400 mb-6">Contact Us</h1>
            <p className="text-gray-300 text-lg mb-6 leading-relaxed">
              Kindly fill the form or reach out to us via email or mobile.
            </p>
            <p className="text-lg text-purple-300 font-medium mb-2">📞 Call: +44 7842312475</p>
            <p className="text-lg text-purple-300 font-medium">✉️ Email: info@jb-studios.com</p>
          </div>

          {/* Right Form Section */}
          <form data-aos="fade-left" className="bg-zinc-900 p-8 rounded-2xl shadow-lg space-y-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full">
                <label className="block text-sm font-semibold text-gray-300 mb-1">First Name</label>
                <input
                  type="text"
                  required
                  placeholder="John"
                  className="w-full p-3 rounded-md bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                />
              </div>
              <div className="w-full">
                <label className="block text-sm font-semibold text-gray-300 mb-1">Last Name</label>
                <input
                  type="text"
                  required
                  placeholder="Doe"
                  className="w-full p-3 rounded-md bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-1">Email Address</label>
              <input
                type="email"
                required
                placeholder="you@example.com"
                className="w-full p-3 rounded-md bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-1">Subject</label>
              <input
                type="text"
                required
                placeholder="Inquiry about wedding shoot"
                className="w-full p-3 rounded-md bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-1">Message</label>
              <textarea
                required
                rows="4"
                placeholder="Type your message..."
                className="w-full p-3 rounded-md bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-md transition duration-300"
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      {/* ✅ Footer */}
      <Footer />
    </>
  );
};

export default ContactPage;
