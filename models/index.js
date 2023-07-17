// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Category has many Product models
Category.hasMany(Product, {
  foreignKey: 'category_id', // This is the foreign key column in the Product model
});

// Product belongs to Category
Product.belongsTo(Category, {
  foreignKey: 'category_id', // This is the foreign key column in the Product model
});

// Product belongs to many Tag models through the ProductTag model
Product.belongsToMany(Tag, {
  through: 'product_tag', // This is the name of the junction table ProductTag in the database
  foreignKey: 'product_id', // This is the foreign key column in the junction table
});


// Tag belongs to many Product models through the ProductTag model
Tag.belongsToMany(Product, {
  through: 'product_tag', // This is the name of the junction table ProductTag in the database
  foreignKey: 'tag_id', // This is the foreign key column in the junction table
});


module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
