const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// Get all categories with their associated products
router.get('/', async (req, res) => {
  try {
    // Find all categories with associated products
    const categories = await Category.findAll({
      include: Product, // Include associated Product data
    });
    res.json(categories); // Send the response with categories data as JSON
  } catch (err) {
    console.error(err); // Log the error to the console
    res.status(500).json({ message: 'Server Error' }); // Send a 500 status and error message as JSON
  }
});

// Get a single category by its `id` value with associated products
router.get('/:id', async (req, res) => {
  try {
    const categoryId = req.params.id;
    // Find a category by its `id` with associated products
    const category = await Category.findByPk(categoryId, {
      include: Product, // Include associated Product data
    });
    if (!category) {
      // If category not found, return a 404 status with an error message
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json(category); // Send the response with category data as JSON
  } catch (err) {
    console.error(err); // Log the error to the console
    res.status(500).json({ message: 'Server Error' }); // Send a 500 status and error message as JSON
  }
});

// Create a new category
router.post('/', async (req, res) => {
  try {
    // Create a new category with data from the request body
    const newCategory = await Category.create(req.body);
    res.json(newCategory); // Send the response with the newly created category data as JSON
  } catch (err) {
    console.error(err); // Log the error to the console
    res.status(500).json({ message: 'Server Error' }); // Send a 500 status and error message as JSON
  }
});

// Update a category by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const categoryId = req.params.id;
    // Update the category with data from the request body where id matches
    const updatedCategory = await Category.update(req.body, {
      where: { id: categoryId },
    });
    if (updatedCategory[0] === 0) {
      // If no rows were updated, the category does not exist, return a 404 status with an error message
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json({updatedCategory, message: 'Category updated successfully'}); // Send the response with the updated category data as JSON
  } catch (err) {
    console.error(err); // Log the error to the console
    res.status(500).json({ message: 'Server Error' }); // Send a 500 status and error message as JSON
  }
});

// Delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const categoryId = req.params.id;
    // Delete the category where id matches
    const deletedCategory = await Category.destroy({
      where: { id: categoryId },
    });
    if (!deletedCategory) {
      // If no rows were deleted, the category does not exist, return a 404 status with an error message
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json({ message: 'Category deleted successfully' }); // Send the response with a success message as JSON
  } catch (err) {
    console.error(err); // Log the error to the console
    res.status(500).json({ message: 'Server Error' }); // Send a 500 status and error message as JSON
  }
});

module.exports = router;
