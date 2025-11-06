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
    const owner = req.user._id;
    const item = await ClothingItem.create({ name, weather, imageUrl, owner });
    return res.status(201).send(item);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).send({ message: err.message });
    }
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
    if (err.name === "CastError") {
      return res.status(400).send({ message: "Invalid item ID" });
    }
    return res.status(500).send({ message: err.message });
  }
};

const likeItem = async (req, res) => {
  try {
    const item = await ClothingItem.findByIdAndUpdate(
      req.params.itemId,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    );
    if (!item) {
      return res.status(404).send({ message: "Item not found" });
    }
    return res.send(item);
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).send({ message: "Invalid item ID" });
    }
    return res.status(500).send({ message: err.message });
  }
};

const dislikeItem = async (req, res) => {
  try {
    const item = await ClothingItem.findByIdAndUpdate(
      req.params.itemId,
      { $pull: { likes: req.user._id } },
      { new: true }
    );
    if (!item) {
      return res.status(404).send({ message: "Item not found" });
    }
    return res.send(item);
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).send({ message: "Invalid item ID" });
    }
    return res.status(500).send({ message: err.message });
  }
};

module.exports = { getItems, createItem, deleteItem, likeItem, dislikeItem };
