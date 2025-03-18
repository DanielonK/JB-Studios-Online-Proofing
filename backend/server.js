const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./utils/db'); // Import Sequelize connection

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Root route test
app.get('/', (req, res) => res.send('JB Studios API Running!'));

// Placeholder for future routes
// app.use('/api/bookings', bookingsRoutes);
// app.use('/api/users', userRoutes);

// Sync Sequelize models to the database
sequelize.sync({ force: false }).then(() => {
  console.log('Database & tables created!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

