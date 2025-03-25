import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GalleryPage = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/gallery');
        console.log('Gallery images from backend:', res.data); // 🔍 Debug log
        setImages(res.data);
      } catch (error) {
        console.error('Failed to load gallery:', error);
      }
    };

    fetchGallery();
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">Proofing Gallery</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((img, index) => (
          <div key={index} className="bg-white shadow rounded p-4">
            {/* ✅ THIS IS WHERE THE IMAGE TAG GOES */}
            <img
              src={`http://localhost:5000${img.imageUrl}`}
              alt={img.title}
              className="w-full h-64 object-cover rounded"
            />
            <p className="mt-2 text-center font-medium">{img.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryPage;
