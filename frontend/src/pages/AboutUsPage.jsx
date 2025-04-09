// src/pages/AboutUsPage.jsx
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Dialog } from "@headlessui/react";
import Footer from "../components/Footer";
import jbBioImage from "../images/JB_bio.png"; // Portrait photo

const testimonials = [
  {
    name: "Sophia M.",
    message: "Joel captured our wedding day perfectly. Every photo felt like a scene from a movie. Truly blessed to have found him!",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    name: "Daniel K.",
    message: "Working with Joel was a breeze. His attention to detail and creative direction made my corporate headshots stand out.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Amelia R.",
    message: "Absolutely loved my birthday shoot! Joel made me feel confident and the pictures turned out stunning.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
];

const AboutUsPage = () => {
  const [isPortfolioOpen, setIsPortfolioOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: "ease-in-out" });

    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black text-white">
        {/* Hero Section */}
        <section data-aos="fade-down" className="text-center py-24 px-6">
          <h1 className="text-6xl md:text-7xl font-bold text-purple-400 mb-4 tracking-tight">
            About Us
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg md:text-xl">
            Get to know the artist behind the lens.
          </p>
        </section>

        {/* Meet Joel */}
        <section data-aos="fade-up" className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-20 items-center">
          {/* Image */}
          <div className="flex justify-center">
            <img
              src={jbBioImage}
              alt="Joel Obeng"
              className="h-[500px] w-auto object-cover rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Text */}
          <div className="space-y-6 text-center md:text-left">
            <h2 className="text-4xl font-bold text-white">Meet Joel Obeng</h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              Hello, my name is Joel Obeng. I am a professional photographer specializing in creative shoots, birthdays, weddings, beauty, and corporate headshots.
              <br /><br />
              With a keen eye for detail and a passion for storytelling, I strive to capture authentic moments that leave a lasting impact. Whether it's the elegance of a wedding, the energy of a birthday celebration, or the professionalism of a corporate portrait, my goal is to deliver stunning images that reflect the essence of every subject.
            </p>
          </div>
        </section>

        {/* My Journey */}
        <section data-aos="fade-up" className="max-w-5xl mx-auto px-6 py-20 text-center">
          <h2 className="text-4xl font-bold text-purple-400 mb-8">My Journey</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-zinc-800 p-6 rounded-2xl shadow-lg">
              <h3 className="text-white text-2xl font-semibold mb-4">100+ Successful Shoots</h3>
            </div>
            <div className="bg-zinc-800 p-6 rounded-2xl shadow-lg">
              <h3 className="text-white text-2xl font-semibold mb-4">5+ Years of Experience</h3>
            </div>
            <div className="bg-zinc-800 p-6 rounded-2xl shadow-lg">
              <h3 className="text-white text-2xl font-semibold mb-4">Creative Studio in London</h3>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section data-aos="fade-up" className="text-center py-24">
          <h2 className="text-4xl font-bold text-white mb-6">What Clients Say</h2>
          <div className="relative max-w-4xl mx-auto bg-zinc-800 p-10 rounded-2xl shadow-xl">
            <img
              src={testimonials[currentTestimonial].image}
              alt={testimonials[currentTestimonial].name}
              className="w-24 h-24 rounded-full mx-auto mb-6 object-cover"
            />
            <h3 className="text-purple-400 text-xl font-semibold mb-2">{testimonials[currentTestimonial].name}</h3>
            <p className="text-gray-300 text-lg leading-relaxed">"{testimonials[currentTestimonial].message}"</p>
          </div>
        </section>

        {/* Portfolio Viewer Button */}
        <section data-aos="fade-up" className="text-center py-24">
          <h2 className="text-4xl font-bold text-white mb-6">Explore My Portfolio</h2>
          <p className="text-gray-400 mb-8">Discover the stories I've captured through my lens.</p>
          <button
            onClick={() => setIsPortfolioOpen(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg transition shadow-lg"
          >
            View Portfolio
          </button>
        </section>

        {/* Call to Action */}
        <section data-aos="fade-up" className="text-center py-24 px-6">
          <h2 className="text-4xl font-bold text-purple-400 mb-6">Let's Create Something Beautiful</h2>
          <a
            href="/contact"
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg transition shadow-lg"
          >
            Get In Touch
          </a>
        </section>
      </div>

      {/* PDF Modal Viewer */}
      <Dialog open={isPortfolioOpen} onClose={() => setIsPortfolioOpen(false)} className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Background Blur */}
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" aria-hidden="true" />

        {/* Modal Content */}
        <div className="bg-zinc-900 rounded-xl p-6 relative max-w-5xl w-full h-[90vh] overflow-hidden">
          {/* Close Button */}
          <button
            onClick={() => setIsPortfolioOpen(false)}
            className="absolute top-4 right-4 text-white hover:text-purple-400 transition"
          >
            ✕
          </button>

          {/* iFrame for PDF */}
          <iframe
            src="/JB_Portfolio.pdf"
            title="Portfolio"
            className="w-full h-full rounded-lg"
            frameBorder="0"
          ></iframe>
        </div>
      </Dialog>

      <Footer />
    </>
  );
};

export default AboutUsPage;
