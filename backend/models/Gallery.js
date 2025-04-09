const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');
const Category = require('./Category');

const Gallery = sequelize.define('Gallery', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  section: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mediaType: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "image",
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Categories',
      key: 'id',
    },
  },
}, {
  tableName: 'galleries',
  timestamps: true,
});

Gallery.belongsTo(Category, { foreignKey: 'categoryId', onDelete: 'CASCADE' });
Category.hasMany(Gallery, { foreignKey: 'categoryId' });

module.exports = Gallery;
