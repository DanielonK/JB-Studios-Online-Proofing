const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

const Gallery = sequelize.define('Gallery', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'galleries', // ✅ Explicitly setting the correct table name
  timestamps: true,  // ✅ Automatically adds createdAt & updatedAt fields
});

module.exports = Gallery;
