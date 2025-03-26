const Gallery = require('../models/Gallery');
const Category = require('../models/Category');
const path = require('path');
const multer = require('multer');

// ✅ Multer config for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueName);
  },
});

const upload = multer({ storage });

// ✅ Upload an image with title and categoryId
exports.uploadImage = async (req, res) => {
  try {
    const { title, categoryId, section } = req.body;
    const imageUrl = `/uploads/${req.file.filename}`;

    const newImage = await Gallery.create({
      title,
      imageUrl,
      categoryId,
      section, // ✅ This is what fixes the error
    });

    res.status(201).json(newImage);
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Failed to upload image" });
  }
};

// ✅ Get all gallery images including category info
exports.getGalleryImages = async (req, res) => {
  try {
    const images = await Gallery.findAll({
      include: {
        model: Category,
        attributes: ['name', 'section'],
      },
    });

    res.json(images);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch gallery images' });
  }
};

// ✅ Get all unique categories for dropdown (admin form or frontend filters)
exports.getCategories = async (req, res) => {
  try {
    const where = {};
    if (req.query.section) {
      where.section = req.query.section;
    }

    const categories = await Category.findAll({
      where,
      attributes: ['id', 'name', 'section'],
      order: [['name', 'ASC']],
    });

    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
};

// ✅ Export multer for use in routes
exports.upload = upload;
