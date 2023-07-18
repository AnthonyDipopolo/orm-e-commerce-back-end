const { Model, DataTypes } = require('sequelize'); // Import necessary modules from sequelize
const sequelize = require('../config/connection.js'); // Import the sequelize connection
// const Product = require('./Product');

class Tag extends Model {} // Create a Tag class that extends the Sequelize Model class

Tag.init(
  {
    
    id: {
      type: DataTypes.INTEGER, // Data type for the column integer
      allowNull: false, // The column cannot be null
      primaryKey: true, // The column is the primary key of the table
      autoIncrement: true, // The column auto-increments for each new row
    },
    tag_name: {
      type: DataTypes.STRING, // Data type for the column string
      allowNull: false, // The column cannot be null
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

module.exports = Tag; // Export the Tag model
