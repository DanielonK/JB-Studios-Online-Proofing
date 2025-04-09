import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const BehindTheScenesPage = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: "ease-in-out" });
  }, []);

  return (
    <div className="min-h-screen bg-black text-white py-16">
      {/* Hero */}
      <section data-aos="fade-down" className="text-center mb-16 px-4">
        <h1 className="text-5xl md:text-6xl font-bold text-purple-400 mb-4">Behind the Scenes</h1>
        <p className="max-w-2xl mx-auto text-lg text-gray-400">
          Step into our world and experience the raw, real magic behind every shoot.
        </p>
      </section>

      {/* Gallery */}
      <section data-aos="fade-up" className="max-w-7xl mx-auto px-4 mb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[1,2,3,4,5,6].map((i) => (
            <div key={i} className="overflow-hidden rounded-lg shadow-lg group">
              <img
                src={`/behind-scenes/bts${i}.jpg`}
                alt="Behind the scenes"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Mini-Stories */}
      <section data-aos="fade-up" className="bg-zinc-900 py-12 px-6 md:px-12 mb-24">
        <div className="max-w-5xl mx-auto space-y-12">
          <div>
            <h2 className="text-3xl font-bold mb-2">⛅ Sunset Chase</h2>
            <p className="text-gray-400">
              With only minutes before golden hour faded, we sprinted through the fields, cameras in hand, capturing every last golden frame.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-2">🌧️ Rainy Day Hustle</h2>
            <p className="text-gray-400">
              Sometimes rain brings magic. Waterproof covers, umbrellas, and spontaneous smiles turned a rainy shoot into pure cinematic poetry.
            </p>
          </div>
        </div>
      </section>

      {/* Gear List */}
      <section data-aos="fade-up" className="text-center">
        <h2 className="text-4xl font-bold mb-6 text-purple-400">🎥 Our Gear Kit</h2>
        <ul className="list-none space-y-4 text-gray-300">
          {[
            "Canon R5 / R6 cameras",
            "Sigma Art prime lenses",
            "DJI Air 2S Drone",
            "Zhiyun Weebill-S Gimbal",
            "Godox Lighting Setup",
          ].map((item, idx) => (
            <li key={idx} className="text-lg">
              ➔ {item}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default BehindTheScenesPage;
