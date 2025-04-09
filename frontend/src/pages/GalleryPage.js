import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GalleryPage = () => {
  const [media, setMedia] = useState([]);
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/gallery');
        setMedia(res.data);
      } catch (error) {
        console.error('Failed to load gallery:', error);
      }
    };

    fetchGallery();
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Proofing Gallery</h2>

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {media.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow hover:shadow-lg transition rounded cursor-pointer"
            onClick={() => setLightbox(item)}
          >
            {item.mediaType === "video" ? (
              <video
                src={`http://localhost:5000${item.imageUrl}`}
                className="w-full h-64 object-cover rounded-t"
                muted
                preload="metadata"
                onMouseOver={(e) => e.target.play()}
                onMouseOut={(e) => e.target.pause()}
                controls={false}
              />
            ) : (
              <img
                src={`http://localhost:5000${item.imageUrl}`}
                alt={item.title}
                className="w-full h-64 object-cover rounded-t"
              />
            )}
            <p className="text-center font-medium p-2">{item.title}</p>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightbox && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="relative bg-white p-4 rounded shadow-lg max-w-3xl w-full">
            <button
              className="absolute top-2 right-2 text-gray-700 text-xl"
              onClick={() => setLightbox(null)}
            >
              ✖
            </button>
            {lightbox.mediaType === "video" ? (
              <video
                src={`http://localhost:5000${lightbox.imageUrl}`}
                className="w-full rounded"
                controls
                autoPlay
              />
            ) : (
              <img
                src={`http://localhost:5000${lightbox.imageUrl}`}
                alt={lightbox.title}
                className="w-full object-contain max-h-[80vh] rounded"
              />
            )}
            <p className="text-center font-semibold mt-4">{lightbox.title}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
