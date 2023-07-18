const { Model, DataTypes } = require('sequelize'); // Import necessary modules from sequelize
const sequelize = require('../config/connection'); // Import the sequelize connection

class ProductTag extends Model {} // Create a ProductTag class that extends the Sequelize Model class

ProductTag.init(
  {
    
    id: {
      type: DataTypes.INTEGER, // Data type for the column integer
      allowNull: false, // The column cannot be null
      primaryKey: true, // The column is the primary key of the table
      autoIncrement: true, // The column auto-increments for each new row
    },
    product_id: {
      type: DataTypes.INTEGER, // Data type for the column integer
      references: {
        model: 'product', // Reference the product model
        key: 'id', // Use the id column of the 'product' model as the reference key
      },
    },
    tag_id: {
      type: DataTypes.INTEGER, // Data type for the column integer
      references: {
        model: 'tag', // Reference the tag model
        key: 'id', // Use the id column of the 'tag' model as the reference key
      },
    },
  },
  {
    sequelize, 
    timestamps: false, 
    freezeTableName: true, 
    underscored: true, 
    modelName: 'product_tag', 
  }
);

module.exports = ProductTag; // Export the ProductTag model
