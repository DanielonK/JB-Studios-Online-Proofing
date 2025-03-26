// models/Category.js
const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

const Category = sequelize.define('Category', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  section: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'categories',
  timestamps: true
});

module.exports = Category;
