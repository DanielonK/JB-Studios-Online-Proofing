// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path'); // ✅ For serving static files
const sequelize = require('./utils/db'); // ✅ Sequelize DB connection

// ✅ Load environment variables
dotenv.config();

// ✅ Initialize express app
const app = express();
app.use(cors());
app.use(express.json());

// ✅ Serve static images (from /uploads)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Import routes
const userRoutes = require('./routes/userRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const galleryRoutes = require('./routes/galleryRoutes');
const categoryRoutes = require('./routes/categoryRoutes'); // ✅ Make sure this file ends with module.exports = router

// ✅ Use routes
app.use('/api/users', userRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/categories', categoryRoutes);

// ✅ Root route test
app.get('/', (req, res) => {
  res.send('JB Studios API Running!');
});

// ✅ Sync Sequelize models
sequelize.sync({ force: false })
  .then(() => console.log('✅ Database & tables created!'))
  .catch(error => console.error('❌ Sequelize sync error:', error));

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));