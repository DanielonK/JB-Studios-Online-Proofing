import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GalleryPage = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const res = await axios.get('http://localhost:5000/api/gallery');
      setImages(res.data);
    };
    fetchImages();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800">Proofing Gallery</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {images.map((img) => (
          <img key={img.id} src={img.imageUrl} alt={img.title} className="rounded-lg shadow-md" />
        ))}
      </div>
    </div>
  );
};

export default GalleryPage;
