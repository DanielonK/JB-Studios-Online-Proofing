const express = require('express');
const router = express.Router();
const galleryController = require('../controllers/galleryController');

// Upload image or video
router.post('/upload', galleryController.upload.single('image'), galleryController.uploadImage);

// Get gallery images
router.get('/', galleryController.getGalleryImages);

module.exports = router;
