import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GalleryPage = () => {
  const [images, setImages] = useState([]);
  const [lightboxImage, setLightboxImage] = useState(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/gallery');
        setImages(res.data);
      } catch (error) {
        console.error('Failed to load gallery:', error);
      }
    };

    fetchGallery();
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Proofing Gallery</h2>

      {/* Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((img, index) => (
          <div
            key={index}
            className="bg-white shadow hover:shadow-lg transition rounded cursor-pointer"
            onClick={() => setLightboxImage(img)}
          >
            <img
              src={`http://localhost:5000${img.imageUrl}`}
              alt={img.title}
              className="w-full h-64 object-cover rounded-t"
            />
            <p className="text-center font-medium p-2">{img.title}</p>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="relative bg-white p-4 rounded shadow-lg max-w-3xl w-full">
            <button
              className="absolute top-2 right-2 text-gray-700 text-xl"
              onClick={() => setLightboxImage(null)}
            >
              ✖
            </button>
            <img
              src={`http://localhost:5000${lightboxImage.imageUrl}`}
              alt={lightboxImage.title}
              className="w-full object-contain max-h-[80vh] rounded"
            />
            <p className="text-center font-semibold mt-4">{lightboxImage.title}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
