const { Model, DataTypes } = require('sequelize'); // Import necessary modules from sequelize
const sequelize = require('../config/connection.js'); // Import the sequelize connection

class Category extends Model {} // Create a Category class that extends the Sequelize Model class

Category.init(
  {
    // Define columns for the Category model
    id: {
      type: DataTypes.INTEGER, // Data type for the column integer
      allowNull: false, // The column cannot be null
      primaryKey: true, // The column is the primary key of the table
      autoIncrement: true, // The column auto-increments for each new row
    },
    category_name: {
      type: DataTypes.STRING, // Data type for the column string
      allowNull: false, // The column cannot be null
    },
  },
  {
    sequelize, // Pass the sequelize connection to the model
    timestamps: false, // Disable timestamps createdAt and updatedAt columns
    freezeTableName: true, // Don't change the table name to plural form
    underscored: true, // Use underscores instead of camel case for column names
    modelName: 'category', // Name of the model in singular form used in associations
  }
);


module.exports = Category; // Export the Category model
