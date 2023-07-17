const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// Get all products with their associated Category and Tag data
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [Category, Tag], // Include associated Category and Tag data
    });
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get a single product by its `id` value with associated Category and Tag data
router.get('/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findByPk(productId, {
      include: [Category, Tag], // Include associated Category and Tag data
    });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Create a new product
router.post('/', async (req, res) => {
  try {
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
    
    res.status(201).json(newProduct);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// Update product by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedProduct = await Product.update(req.body, {
      where: { id: productId },
    });

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

    res.json(updatedProduct);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// Delete a product by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await Product.destroy({
      where: { id: productId },
    });
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
