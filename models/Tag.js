const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');
// const Product = require('./Product');


class Tag extends Model {}

Tag.init(
  {
    // Define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    tag_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'tag',
  }
);

// Tag belongs to many Product models through the ProductTag model
// Tag.belongsToMany(Product, {
//   through: 'product_tag', // This is the name of the junction table (ProductTag) in the database
//   foreignKey: 'tag_id', // This is the foreign key column in the junction table
// });

module.exports = Tag;
