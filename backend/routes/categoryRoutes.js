const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

// ✅ Create category with name & section
router.post('/', async (req, res) => {
  try {
    const { name, section } = req.body;

    if (!name || !section) {
      return res.status(400).json({ error: 'Name and section are required' });
    }

    const category = await Category.create({ name, section });
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ✅ Get categories (optionally filter by section)
router.get('/', async (req, res) => {
  try {
    const where = {};
    if (req.query.section) {
      where.section = req.query.section;
    }

    const categories = await Category.findAll({ where });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; // ✅ This line must be last