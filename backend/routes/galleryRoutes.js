// galleryRoutes.js
const express = require('express');
const router = express.Router();
const galleryController = require('../controllers/galleryController');

// ✅ Upload image with categoryId using multer middleware
router.post('/upload', galleryController.upload.single('image'), galleryController.uploadImage);

// ✅ Get all gallery images with category data
router.get('/', galleryController.getGalleryImages);

module.exports = router;