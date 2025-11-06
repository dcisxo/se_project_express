const ClothingItem = require("../models/clothingItems");

const getItems = async (req, res) => {
  try {
    const items = await ClothingItem.find({});
    return res.send(items);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const createItem = async (req, res) => {
  try {
    const { name, weather, imageUrl } = req.body;
    const owner = req.user._id; // assuming user ID is available in req.user
    const item = await ClothingItem.create({ name, weather, imageUrl, owner });
    return res.status(201).send(item);
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
};

const deleteItem = async (req, res) => {
  try {
    const item = await ClothingItem.findByIdAndDelete(req.params.itemId);
    if (!item) {
      return res.status(404).send({ message: "Item not found" });
    }
    return res.send({ message: "Item deleted successfully" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

module.exports = { getItems, createItem, deleteItem };
