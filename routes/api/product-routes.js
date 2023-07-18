const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// Get all products with their associated Category and Tag data
router.get('/', async (req, res) => {
  try {
    // Find all products with associated Category and Tag data
    const products = await Product.findAll({
      include: [Category, Tag], // Include associated Category and Tag data
    });
    res.json(products); // Send the response with products data as JSON
  } catch (err) {
    console.error(err); // Log the error to the console
    res.status(500).json({ message: 'Server Error' }); // Send a 500 status and error message as JSON
  }
});

// Get a single product by its `id` value with associated Category and Tag data
router.get('/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    // Find a product by its `id` with associated Category and Tag data
    const product = await Product.findByPk(productId, {
      include: [Category, Tag], // Include associated Category and Tag data
    });
    if (!product) {
      // If product not found, return a 404 status with an error message
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product); // Send the response with product data as JSON
  } catch (err) {
    console.error(err); // Log the error to the console
    res.status(500).json({ message: 'Server Error' }); // Send a 500 status and error message as JSON
  }
});

// Create a new product
router.post('/', async (req, res) => {
  try {
    // Create a new product with data from the request body
    const newProduct = await Product.create(req.body);

    // If there are product tags, create pairings to bulk create in the ProductTag model
    if (req.body.tagIds && req.body.tagIds.length) {
      const productTagIdArr = req.body.tagIds.map((tag_id) => {
        return {
          product_id: newProduct.id,
          tag_id,
        };
      });
      await ProductTag.bulkCreate(productTagIdArr);
    }

    res.status(201).json(newProduct); // Send the response with the newly created product data as JSON
  } catch (err) {
    console.error(err); // Log the error to the console
    res.status(400).json(err); // Send a 400 status and error message as JSON
  }
});

// Update product by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    // Update the product with data from the request body where id matches
    const updatedProduct = await Product.update(req.body, {
      where: { id: productId },
    });

    // If there are product tags, update them in the ProductTag model
    if (req.body.tagIds && req.body.tagIds.length) {
      const productTags = await ProductTag.findAll({
        where: { product_id: productId },
      });

      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: productId,
            tag_id,
          };
        });

      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      await Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    }

    res.json(updatedProduct); // Send the response with the updated product data as JSON
  } catch (err) {
    console.error(err); // Log the error to the console
    res.status(400).json(err); // Send a 400 status and error message as JSON
  }
});

// Delete a product by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    // Delete the product where id matches
    const deletedProduct = await Product.destroy({
      where: { id: productId },
    });
    if (!deletedProduct) {
      // If no rows were deleted, the product does not exist, return a 404 status with an error message
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' }); // Send the response with a success message as JSON
  } catch (err) {
    console.error(err); // Log the error to the console
    res.status(500).json({ message: 'Server Error' }); // Send a 500 status and error message as JSON
  }
});

module.exports = router;
