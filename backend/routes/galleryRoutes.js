const express = require("express");
const multer = require("multer");
const path = require("path");
const Gallery = require("../models/Gallery");

const router = express.Router();

// ✅ Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique file names
  },
});
const upload = multer({ storage });

// ✅ Upload an image (ADMIN ONLY)
router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const { title } = req.body;
    const imageUrl = `/uploads/${req.file.filename}`; // Save the image path
    const image = await Gallery.create({ title, imageUrl });
    res.status(201).json(image);
  } catch (error) {
    res.status(500).json({ error: "Failed to upload image" });
  }
});

// ✅ Fetch all images
router.get("/", async (req, res) => {
  try {
    const images = await Gallery.findAll();
    res.json(images);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch gallery images" });
  }
});

module.exports = router;
