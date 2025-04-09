import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "../components/Footer"; // ✅ Import Footer

const TutorialsPage = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: "ease-in-out" });
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black text-white py-16">
        {/* Hero */}
        <section data-aos="fade-down" className="text-center mb-16 px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-purple-400 mb-4">Tutorials</h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-400">
            Step-by-step guides and tips to level up your photography and videography skills.
          </p>
        </section>

        {/* Featured Tutorials */}
        <section className="max-w-7xl mx-auto px-4 space-y-24 mb-24">
          {/* Tutorial 1 */}
          <div data-aos="fade-up" className="flex flex-col md:flex-row items-center gap-10">
            <div className="w-full md:w-1/2 aspect-video rounded-2xl overflow-hidden shadow-xl border border-zinc-700">
              <iframe
                src="https://www.youtube.com/embed/ScMzIvxBSi4"
                title="Editing Cinematic Videos"
                frameBorder="0"
                allow="autoplay; fullscreen"
                className="w-full h-full"
                allowFullScreen
              ></iframe>
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl font-bold mb-4">🎬 Cinematic Wedding Editing</h2>
              <p className="text-gray-400">
                Learn our exact editing techniques to create emotional, cinematic wedding stories that truly move people.
              </p>
            </div>
          </div>

          {/* Tutorial 2 */}
          <div data-aos="fade-up" data-aos-delay="200" className="flex flex-col md:flex-row-reverse items-center gap-10">
            <div className="w-full md:w-1/2 aspect-video rounded-2xl overflow-hidden shadow-xl border border-zinc-700">
              <iframe
                src="https://www.youtube.com/embed/Azfi7w5Y9dA"
                title="Drone Filming Basics"
                frameBorder="0"
                allow="autoplay; fullscreen"
                className="w-full h-full"
                allowFullScreen
              ></iframe>
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl font-bold mb-4">🚁 Drone Footage for Beginners</h2>
              <p className="text-gray-400">
                From basic settings to pro flying techniques — master smooth, cinematic aerial shots even if you’re new to drones.
              </p>
            </div>
          </div>
        </section>

        {/* Quick Written Guides */}
        <section data-aos="fade-up" className="text-center px-4">
          <h2 className="text-4xl font-bold mb-8 text-purple-400">📚 Quick Guides</h2>
          <ul className="space-y-4 text-lg text-gray-300">
            <li>⭐ Best low-light camera settings for receptions</li>
            <li>⭐ My favorite gear for destination weddings</li>
            <li>⭐ Fast color grading tricks in Premiere Pro</li>
          </ul>
        </section>
      </div>

      {/* ✅ Footer */}
      <Footer />
    </>
  );
};

export default TutorialsPage;
