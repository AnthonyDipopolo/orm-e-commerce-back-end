const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');
// const Product = require('./Product');


class Category extends Model {}

Category.init(
  {
   
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);

// Category has many Product models
// Category.hasMany(Product, {
//   foreignKey: 'category_id', // This is the foreign key column in the Product model
// });

module.exports = Category;
