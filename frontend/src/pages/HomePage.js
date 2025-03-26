import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/gallery');
        setImages(res.data);
      } catch (error) {
        console.error('Failed to load gallery:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const maxScrollLeft = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
        if (scrollRef.current.scrollLeft >= maxScrollLeft) {
          scrollRef.current.scrollLeft = 0; // Go back to the start
        } else {
          scrollRef.current.scrollLeft += 400; // Scroll by 400px
        }
      }
    }, 3000); // Adjust the interval time for "stop and go" effect

    return () => clearInterval(interval);
  }, []);

  const scroll = (offset) => {
    if (scrollRef.current) {
      const maxScrollLeft = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
      let newScrollLeft = scrollRef.current.scrollLeft + offset;
      if (newScrollLeft < 0) {
        newScrollLeft = 0;
      } else if (newScrollLeft > maxScrollLeft) {
        newScrollLeft = maxScrollLeft;
      }
      scrollRef.current.scrollLeft = newScrollLeft;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-black text-white">
      <div className="w-full py-10">
        <h1 className="text-4xl font-extrabold text-center mb-2 tracking-wider">
          Welcome to JBS Studios
        </h1>
        <p className="text-center text-base mb-6 tracking-wide">
          Your one-stop solution for photography bookings & proofing gallery
        </p>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : images.length === 0 ? (
          <p className="text-center">No images found in the gallery.</p>
        ) : (
          <div className="relative w-full">
            {/* Arrows */}
            <button
              onClick={() => scroll(-400)}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-black text-white p-2 z-10 rounded-full"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => scroll(400)}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-black text-white p-2 z-10 rounded-full"
            >
              <ChevronRight size={24} />
            </button>

            {/* Horizontal Scrollable Images */}
            <div
              ref={scrollRef}
              className="flex overflow-x-hidden overflow-y-hidden scrollbar-hide scroll-smooth w-full"
            >
              {images.map((img) => (
                <div
                  key={img.id}
                  className="flex-shrink-0 w-auto h-[500px] overflow-hidden shadow-md hover:shadow-lg transition"
                >
                  <img
                    src={`http://localhost:5000${img.imageUrl}`}
                    alt={img.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="text-center mt-8 space-y-4">
        <div className="flex gap-4 justify-center">
          <Link to="/gallery" className="btn btn-primary btn-small" role="button">
            View Gallery
          </Link>
          <Link to="/booking" className="btn btn-secondary btn-small" role="button">
            Book a Session
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
