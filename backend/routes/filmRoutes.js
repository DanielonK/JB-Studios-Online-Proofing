const express = require('express');
const router = express.Router();
const filmController = require('../controllers/filmController');

// GET /api/films
router.get('/', filmController.getAllFilms);

module.exports = router;
