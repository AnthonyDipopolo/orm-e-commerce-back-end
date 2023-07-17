const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
// const Tag = require('./Tag');
// const Category = require('./Category');



class Product extends Model {}

Product.init(
  {
    // Define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isDecimal: true,
      },
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
      validate: {
        isNumeric: true,
      },
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'category',
        key: 'id',
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

// Product belongs to Category
// Product.belongsTo(Category, {
//   foreignKey: 'category_id', // This is the foreign key column in the Product model
// });

// Product belongs to many Tag models through the ProductTag model
// Product.belongsToMany(Tag, {
//   through: 'product_tag', // This is the name of the junction table (ProductTag) in the database
//   foreignKey: 'product_id', // This is the foreign key column in the junction table
// });

module.exports = Product;
