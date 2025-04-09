const Film = require('../models/Film');

exports.getAllFilms = async (req, res) => {
  try {
    const films = await Film.findAll({
      order: [['createdAt', 'DESC']],
    });
    res.json(films);
  } catch (error) {
    console.error('Error fetching films:', error);
    res.status(500).json({ error: 'Server error fetching films' });
  }
};
