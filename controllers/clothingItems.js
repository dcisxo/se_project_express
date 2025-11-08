const ClothingItem = require("../models/clothingItems");
const { ERROR_400, ERROR_404, ERROR_500 } = require("../utils/errors");

const getItems = async (req, res) => {
  try {
    const items = await ClothingItem.find({});
    return res.send(items);
  } catch (err) {
    console.error(err);
    return res
      .status(ERROR_500)
      .send({ message: "An error has occurred on the server" });
  }
};

const createItem = async (req, res) => {
  try {
    const { name, weather, imageUrl } = req.body;
    const owner = req.user._id;
    const item = await ClothingItem.create({ name, weather, imageUrl, owner });
    return res.status(201).send(item);
  } catch (err) {
    console.error(err);
    if (err.name === "ValidationError") {
      return res.status(ERROR_400).send({ message: err.message });
    }
    return res
      .status(ERROR_500)
      .send({ message: "An error has occurred on the server" });
  }
};

const deleteItem = async (req, res) => {
  try {
    await ClothingItem.findByIdAndDelete(req.params.itemId).orFail();
    return res.send({ message: "Item deleted successfully" });
  } catch (err) {
    console.error(err);
    if (err.name === "DocumentNotFoundError") {
      return res.status(ERROR_404).send({ message: "Item not found" });
    }
    if (err.name === "CastError") {
      return res.status(ERROR_400).send({ message: "Invalid item ID" });
    }
    return res
      .status(ERROR_500)
      .send({ message: "An error has occurred on the server" });
  }
};

const likeItem = async (req, res) => {
  try {
    const item = await ClothingItem.findByIdAndUpdate(
      req.params.itemId,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    ).orFail();
    return res.send(item);
  } catch (err) {
    console.error(err);
    if (err.name === "DocumentNotFoundError") {
      return res.status(ERROR_404).send({ message: "Item not found" });
    }
    if (err.name === "CastError") {
      return res.status(ERROR_400).send({ message: "Invalid item ID" });
    }
    return res
      .status(ERROR_500)
      .send({ message: "An error has occurred on the server" });
  }
};

const dislikeItem = async (req, res) => {
  try {
    const item = await ClothingItem.findByIdAndUpdate(
      req.params.itemId,
      { $pull: { likes: req.user._id } },
      { new: true }
    ).orFail();
    return res.send(item);
  } catch (err) {
    console.error(err);
    if (err.name === "DocumentNotFoundError") {
      return res.status(ERROR_404).send({ message: "Item not found" });
    }
    if (err.name === "CastError") {
      return res.status(ERROR_400).send({ message: "Invalid item ID" });
    }
    return res
      .status(ERROR_500)
      .send({ message: "An error has occurred on the server" });
  }
};

module.exports = { getItems, createItem, deleteItem, likeItem, dislikeItem };
