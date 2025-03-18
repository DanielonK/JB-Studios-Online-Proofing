const Booking = require('../models/Booking');

exports.createBooking = async (req, res) => {
  try {
    const { date, serviceType } = req.body;
    const userId = req.user.id; // Get user from the JWT token

    const booking = await Booking.create({ userId, date, serviceType });

    res.status(201).json({ message: 'Booking created successfully', booking });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    const userId = req.user.id; // Get user from JWT
    const bookings = await Booking.findAll({ where: { userId } });

    res.json({ bookings });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
