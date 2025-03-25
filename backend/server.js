const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path'); // ✅ Import path module
const sequelize = require('./utils/db'); // Import Sequelize connection

dotenv.config(); // Load environment variables

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Serve static images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Import routes
const userRoutes = require('./routes/userRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const galleryRoutes = require('./routes/galleryRoutes'); // ✅ Import gallery route

// ✅ Register routes
app.use('/api/users', userRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/gallery', galleryRoutes); // ✅ Register gallery route

// ✅ Root route test
app.get('/', (req, res) => res.send('JB Studios API Running!'));

// ✅ Sync the database
sequelize.sync({ force: false })
  .then(() => console.log('✅ Database & tables created!'))
  .catch(error => console.error('❌ Sequelize sync error:', error));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
