const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');
const Category = require('./Category'); // ✅ Import Category model

const Gallery = sequelize.define('Gallery', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Categories',
      key: 'id',
    },
  },
  section: {
    type: DataTypes.STRING,
    allowNull: false, // ✅ Ensure each image is tagged with a section (Photography, Shop, etc.)
  }
}, {
  tableName: 'galleries',
  timestamps: true,
});

// ✅ Define associations
Gallery.belongsTo(Category, { foreignKey: 'categoryId', onDelete: 'CASCADE' });
Category.hasMany(Gallery, { foreignKey: 'categoryId' });

module.exports = Gallery;
