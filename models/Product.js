const { Model, DataTypes } = require('sequelize'); // Import necessary modules from sequelize
const sequelize = require('../config/connection'); // Import the sequelize connection

class Product extends Model {} // Create a Product class that extends the Sequelize Model class

Product.init(
  {
  
    id: {
      type: DataTypes.INTEGER, // Data type for the column (integer)
      allowNull: false, // The column cannot be null
      primaryKey: true, // The column is the primary key of the table
      autoIncrement: true, // The column auto-increments for each new row
    },
    product_name: {
      type: DataTypes.STRING, // Data type for the column string
      allowNull: false, // The column cannot be null
    },
    price: {
      type: DataTypes.DECIMAL(10, 2), // Data type for the column, sadecimal with 10 digits in total and 2 decimal places
      allowNull: false, // The column cannot be null
      validate: {
        isDecimal: true, // Validate that the value is a decimal
      },
    },
    stock: {
      type: DataTypes.INTEGER, // Data type for the column integer
      allowNull: false, // The column cannot be null
      defaultValue: 10, // Set a default value of 10 for the column
      validate: {
        isNumeric: true, // Validate that the value is numeric
      },
    },
    category_id: {
      type: DataTypes.INTEGER, // Data type for the column (integer)
      references: {
        model: 'category', // Reference the category model
        key: 'id', // Use the id column of the category model as the reference key
      },
    },
  },
  {
    sequelize, 
    timestamps: false, 
    freezeTableName: true, 
    underscored: true, 
    modelName: 'product', 
  }
);

module.exports = Product; // Export the Product model
