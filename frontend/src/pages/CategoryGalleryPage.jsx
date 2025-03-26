import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CategoryGalleryPage = () => {
  const { section, category } = useParams();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/gallery`);
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
    <div className="min-h-screen overflow-hidden">
      <div className="w-full py-10">
        <h1 className="text-4xl font-bold text-center capitalize mb-1">
          {category.replace("-", " ")}
        </h1>
        <p className="text-center uppercase text-xs tracking-widest mb-8">
          Section: {section.replace("-", " ")}
        </p>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : images.length === 0 ? (
          <p className="text-center">No images found in this category.</p>
        ) : (
          <div className="relative">
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
    </div>
  );
};

export default CategoryGalleryPage;
