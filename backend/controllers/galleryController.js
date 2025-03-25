// galleryController.js
const Gallery = require('../models/Gallery');

exports.getGalleryImages = async (req, res) => {
  try {
    const images = await Gallery.findAll();
    
    console.log('Gallery images from DB:', images); // ✅ Add this line

    res.json(images);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
