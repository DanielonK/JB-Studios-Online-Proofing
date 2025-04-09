const { Op } = require('sequelize');
const path = require('path');
const multer = require('multer');
const Gallery = require('../models/Gallery');
const Category = require('../models/Category');

// ✅ Multer config for images/videos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save files to uploads/
  },
  filename: (req, file, cb) => {
    const uniqueName = `media-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

// ✅ Accept images and videos + limit file size (500MB) + better fileFilter
const upload = multer({
  storage,
  limits: { fileSize: 500 * 1024 * 1024 }, // 500MB
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "video/mp4",
      "video/quicktime",   // MOV files
      "video/x-msvideo"    // AVI files
    ];
    const allowedExtensions = [".jpeg", ".jpg", ".png", ".gif", ".mp4", ".mov", ".avi"];

    const mimetypeAllowed = allowedMimeTypes.includes(file.mimetype);
    const extnameAllowed = allowedExtensions.includes(path.extname(file.originalname).toLowerCase());

    if (mimetypeAllowed && extnameAllowed) {
      return cb(null, true);
    } else {
      return cb(new Error('Only image and video files (jpg, png, gif, mp4, mov, avi) are allowed.'));
    }
  }
});

exports.upload = upload;

// ✅ Upload new media (image or video)
exports.uploadImage = async (req, res) => {
  console.log("📥 Received file:", req.file);
  console.log("📥 Received body:", req.body);

  try {
    const { title, section, mediaType, categoryId } = req.body;

    if (!title || !section || !req.file) {
      return res.status(400).json({ error: "Missing title, section, or file." });
    }

    const imageUrl = `/uploads/${req.file.filename}`;

    const newMedia = await Gallery.create({
      title,
      imageUrl,
      section,
      mediaType: mediaType || "image", // If frontend doesn't send it, fallback to "image"
      categoryId: categoryId || null,  // Optional
    });

    res.status(201).json(newMedia);
  } catch (error) {
    console.error("❌ Upload error:", error);
    res.status(500).json({ error: "Failed to upload media" });
  }
};

// ✅ Get gallery (images/videos) with optional section filtering
exports.getGalleryImages = async (req, res) => {
  try {
    const where = {};

    if (req.query.section) {
      where.section = req.query.section;
    }

    const media = await Gallery.findAll({
      where,
      include: [
        {
          model: Category,
          attributes: ['id', 'name', 'section'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    res.json(media);
  } catch (error) {
    console.error("❌ Fetch gallery error:", error);
    res.status(500).json({ error: "Failed to fetch gallery media" });
  }
};

// ✅ Get all categories (optionally filtered by section)
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
    console.error("❌ Fetch categories error:", error);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
};
