require('dotenv').config();
const bcrypt = require('bcryptjs');
const sequelize = require('./utils/db');
const User = require('./models/User');

const createAdmin = async () => {
  try {
    // Connect to DB
    await sequelize.authenticate();

    const hashedPassword = await bcrypt.hash('Revelation19;1', 10); // Default password

    // Check if admin already exists
    const existingAdmin = await User.findOne({ where: { email: 'Danielonabogye2004@gmail.com' } });

    if (existingAdmin) {
      console.log('⚠️ Admin user already exists');
    } else {
      await User.create({
        name: 'Admin1',
        email: 'Danielonabogye2004@gmail.com',
        password: hashedPassword,
        role: 'admin',
      });
      console.log('✅ Admin user created!');
    }

    await sequelize.close();
  } catch (err) {
    console.error('❌ Error creating admin:', err);
  }
};

createAdmin();
