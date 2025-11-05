const router = require("express").Router();
const {
  getItems,
  createItem,
  deleteItem,
} = require("../controllers/clothingItems");

router.get("/", getItems);
router.post("/", createItem);
router.delete("/:itemId", deleteItem);

module.exports = router;

const ClothingItem = require("../models/clothingItems");

const getItems = async (req, res) => {
  try {
    const items = await ClothingItem.find({});
    res.send(items);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const createItem = async (req, res) => {
  try {
    const { name, weather, imageUrl } = req.body;
    const owner = req.user._id; // assuming user ID is available in req.user
    const item = await ClothingItem.create({ name, weather, imageUrl, owner });
    res.status(201).send(item);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

const deleteItem = async (req, res) => {
  try {
    const item = await ClothingItem.findByIdAndDelete(req.params.itemId);
    if (!item) {
      return res.status(404).send({ message: "Item not found" });
    }
    res.send({ message: "Item deleted successfully" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = { getItems, createItem, deleteItem };
