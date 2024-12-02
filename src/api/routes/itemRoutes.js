const express = require("express");
const Item = require("../models/Item");
const router = express.Router();

// Fetch all items
router.get("/", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch items" });
  }
});

// Add a new item
router.post("/add", async (req, res) => {
  const { title, image, price, availableSizes } = req.body;

  try {
    const newItem = new Item({ title, image, price, availableSizes });
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(500).json({ error: "Failed to add item" });
  }
});

// Update an item
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, image, price, availableSizes } = req.body;

  try {
    const updatedItem = await Item.findByIdAndUpdate(
      id,
      { title, image, price, availableSizes },
      { new: true }
    );

    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: "Failed to update item" });
  }
});

// Delete an item
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await Item.findByIdAndDelete(id);
    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete item" });
  }
});

module.exports = router;


