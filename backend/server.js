const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const sequelize = require('./utils/db');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Static folder for uploaded media
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Import routes
const userRoutes = require('./routes/userRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const galleryRoutes = require('./routes/galleryRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const filmRoutes = require('./routes/filmRoutes');

// Mount routes
app.use('/api/users', userRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/films', filmRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('JB Studios API Running!');
});

// Sync database
sequelize.sync({ force: false })
  .then(() => console.log('✅ Database & tables synced'))
  .catch((error) => console.error('❌ Sequelize sync error:', error));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
