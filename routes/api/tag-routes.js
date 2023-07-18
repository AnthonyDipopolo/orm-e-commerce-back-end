const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// Get all tags with their associated Product data
router.get('/', async (req, res) => {
  try {
    // Find all tags with associated Product data
    const tags = await Tag.findAll({
      include: Product, // Include associated Product data
    });
    res.json(tags); // Send the response with tags data as JSON
  } catch (err) {
    console.error(err); // Log the error to the console
    res.status(500).json({ message: 'Server error' }); // Send a 500 status and error message as JSON
  }
});

// Get a single tag by its `id` with its associated Product data
router.get('/:id', async (req, res) => {
  try {
    const tagId = req.params.id;
    // Find a tag by its `id` with associated Product data
    const tag = await Tag.findByPk(tagId, {
      include: Product, // Include associated Product data
    });
    if (!tag) {
      // If tag not found, return a 404 status with an error message
      return res.status(404).json({ message: 'Tag not found' });
    }
    res.json(tag); // Send the response with tag data as JSON
  } catch (err) {
    console.error(err); // Log the error to the console
    res.status(500).json({ message: 'Server error' }); // Send a 500 status and error message as JSON
  }
});

// Create a new tag
router.post('/', async (req, res) => {
  try {
    // Create a new tag with data from the request body
    const newTag = await Tag.create(req.body);
    res.json(newTag); // Send the response with the newly created tag data as JSON
  } catch (err) {
    console.error(err); // Log the error to the console
    res.status(500).json({ message: 'Server error' }); // Send a 500 status and error message as JSON
  }
});

// Update a tag's name by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const tagId = req.params.id;
    // Update the tag's name with data from the request body where id matches
    const updatedTag = await Tag.update(
      { tag_name: req.body.tag_name },
      {
        where: { id: tagId },
      }
    );
    if (!updatedTag[0]) {
      // If no rows were updated, the tag does not exist, return a 404 status with an error message
      return res.status(404).json({ message: 'Tag not found' });
    }
    res.json({updatedTag, message: 'Tag updated successfully' }); // Send the response with a success message as JSON
  } catch (err) {
    console.error(err); // Log the error to the console
    res.status(500).json({ message: 'Server error' }); // Send a 500 status and error message as JSON
  }
});

// Delete a tag by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const tagId = req.params.id;
    // Delete the tag where id matches
    const deletedTag = await Tag.destroy({
      where: { id: tagId },
    });
    if (!deletedTag) {
      // If no rows were deleted, the tag does not exist, return a 404 status with an error message
      return res.status(404).json({ message: 'Tag not found' });
    }
    res.json({ message: 'Tag deleted successfully' }); // Send the response with a success message as JSON
  } catch (err) {
    console.error(err); // Log the error to the console
    res.status(500).json({ message: 'Server error' }); // Send a 500 status and error message as JSON
  }
});

module.exports = router;
