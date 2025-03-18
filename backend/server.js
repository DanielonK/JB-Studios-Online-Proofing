const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./utils/db'); // Import Sequelize connection

dotenv.config(); // Load environment variables

const app = express();
app.use(cors());
app.use(express.json());

// Import routes (AFTER initializing app)
const userRoutes = require('./routes/userRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

// Root route test
app.get('/', (req, res) => res.send('JB Studios API Running!'));

// Register API routes
app.use('/api/users', userRoutes);
app.use('/api/bookings', bookingRoutes);

// Sync Sequelize models to the database
sequelize.sync({ force: false })
  .then(() => {
    console.log('✅ Database & tables created!');
  })
  .catch(error => console.error('❌ Sequelize sync error:', error));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
