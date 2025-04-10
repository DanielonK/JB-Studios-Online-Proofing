import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Footer from "../components/Footer";

const CategoryGalleryPage = () => {
  const { section, category } = useParams();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/gallery");
        const filtered = res.data.filter(
          (img) =>
            img.Category?.name.toLowerCase() === category &&
            img.Category?.section.toLowerCase() === section
        );
        setImages(filtered);
      } catch (error) {
        console.error("Failed to fetch images", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [section, category]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const maxScrollLeft =
          scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
        if (scrollRef.current.scrollLeft >= maxScrollLeft) {
          scrollRef.current.scrollLeft = 0;
        } else {
          scrollRef.current.scrollLeft += 400;
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const scroll = (offset) => {
    if (scrollRef.current) {
      const maxScrollLeft =
        scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
      let newScrollLeft = scrollRef.current.scrollLeft + offset;
      scrollRef.current.scrollLeft = Math.max(
        0,
        Math.min(newScrollLeft, maxScrollLeft)
      );
    }
  };

  const capitalize = (text) =>
    text.charAt(0).toUpperCase() + text.slice(1).replace("-", " ");

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-black via-zinc-900 to-black text-white">
      <div className="w-full py-10 px-4 md:px-8">
        <h1 className="text-4xl md:text-6xl font-black text-center mb-3 tracking-tight leading-tight">
          {capitalize(category)}
        </h1>
        <p className="text-center text-base md:text-lg text-zinc-300 tracking-wide">
          Gallery from section: <span className="uppercase text-purple-500">{section.replace("-", " ")}</span>
        </p>

        {loading ? (
          <p className="text-center mt-10">Loading...</p>
        ) : images.length === 0 ? (
          <p className="text-center mt-10">No images found in this category.</p>
        ) : (
          <div className="relative w-full h-[60vh] md:h-[80vh] lg:h-[90vh] mt-6">
            <button
              onClick={() => scroll(-400)}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-black text-white p-2 z-10 rounded-full"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => scroll(400)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-black text-white p-2 z-10 rounded-full"
            >
              <ChevronRight size={24} />
            </button>

            <div
              ref={scrollRef}
              className="flex overflow-x-hidden overflow-y-hidden scrollbar-hide scroll-smooth w-full h-full"
            >
              {images.map((img) => (
                <div
                  key={img.id}
                  className="flex-shrink-0 w-full md:w-auto h-full overflow-hidden relative group transition"
                >
                  <img
                    src={`http://localhost:5000${img.imageUrl}`}
                    alt={img.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute bottom-6 left-6 z-10 text-white text-lg font-semibold backdrop-blur-sm px-4 py-2 bg-black/30 rounded">
                    {img.title}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default CategoryGalleryPage;