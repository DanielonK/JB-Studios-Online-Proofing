import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "../components/Footer";

const WeddingFilmPage = () => {
  const [films, setFilms] = useState([]);
  const [selectedFilm, setSelectedFilm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: "ease-in-out" });
    window.scrollTo(0, 0);

    const fetchFilms = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/gallery?section=Wedding Film');
        const videos = res.data.filter(item => item.mediaType === "video");
        setFilms(videos);
      } catch (err) {
        console.error(err);
        setError("Failed to load wedding films. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchFilms();
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.7 }}
        className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black text-white px-4 md:px-12 py-16"
      >
        <div data-aos="fade-down" className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight text-purple-400">
            Wedding Films
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            We don't just film weddings—we craft timeless love stories. Explore some of our featured moments.
          </p>
        </div>

        {loading && (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-purple-400"></div>
          </div>
        )}

        {error && (
          <div className="text-center text-red-500 mb-6">{error}</div>
        )}

        {!loading && !error && (
          <div className="flex flex-col items-center space-y-20">
            {films.map((film, index) => (
              <div
                key={film.id || index}
                data-aos="fade-up"
                data-aos-delay={index * 200}
                className="flex flex-col items-center w-full max-w-5xl mx-auto px-4"
              >
                <div
                  className="relative w-full aspect-video overflow-hidden rounded-xl shadow-lg border border-gray-700 group"
                  onClick={() => setSelectedFilm(film)}
                >
                  <video
                    src={`http://localhost:5000${film.imageUrl}`}
                    title={film.title}
                    className="w-full h-full object-cover rounded-xl"
                    muted
                    preload="metadata"
                    onMouseOver={(e) => e.target.play()}
                    onMouseOut={(e) => e.target.pause()}
                    controls={false}
                  />

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition duration-300">
                    <div className="bg-white rounded-full p-4 animate-pulse-slow">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-5.197-3.03A1 1 0 008 9.03v5.939a1 1 0 001.555.832l5.197-3.03a1 1 0 000-1.664z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="text-center mt-6">
                  <h2 className="text-2xl md:text-3xl font-semibold mb-2">{film.title}</h2>
                  {film.description && (
                    <p className="text-gray-400 max-w-2xl mx-auto">{film.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal */}
        {selectedFilm && (
          <div
            className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-md flex items-center justify-center z-50"
            onClick={() => setSelectedFilm(null)}
          >
            <div className="relative w-full max-w-5xl p-4">
              <div className="aspect-video relative">
                <video
                  src={`http://localhost:5000${selectedFilm.imageUrl}`}
                  title={selectedFilm.title}
                  className="w-full h-full rounded-xl"
                  controls
                  autoPlay
                />
              </div>
              <button
                className="absolute top-6 right-6 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-80 transition"
                onClick={() => setSelectedFilm(null)}
              >
                ✖
              </button>
            </div>
          </div>
        )}
      </motion.div>

      <Footer />
    </>
  );
};

export default WeddingFilmPage;
