const sequelize = require('./utils/db');

sequelize.authenticate()
  .then(() => {
    console.log('✅ Database connected successfully.');
  })
  .catch((err) => {
    console.error('❌ Database connection error:', err);
  });
