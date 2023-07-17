const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// Get all tags with their associated Product data
router.get('/', async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: Product, // Include associated Product data
    });
    res.json(tags);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get a single tag by its `id` with its associated Product data
router.get('/:id', async (req, res) => {
  try {
    const tagId = req.params.id;
    const tag = await Tag.findByPk(tagId, {
      include: Product, // Include associated Product data
    });
    if (!tag) {
      return res.status(404).json({ message: 'Tag not found' });
    }
    res.json(tag);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new tag
router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create(req.body);
    res.json(newTag);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a tag's name by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const tagId = req.params.id;
    const updatedTag = await Tag.update(
      { tag_name: req.body.tag_name },
      {
        where: { id: tagId },
      }
    );
    if (!updatedTag[0]) {
      return res.status(404).json({ message: 'Tag not found' });
    }
    res.json({ message: 'Tag updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a tag by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const tagId = req.params.id;
    const deletedTag = await Tag.destroy({
      where: { id: tagId },
    });
    if (!deletedTag) {
      return res.status(404).json({ message: 'Tag not found' });
    }
    res.json({ message: 'Tag deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
