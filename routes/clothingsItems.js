const router = require("express").Router();
const mongoose = require("mongoose");
const {
  getItems,
  createItem,
  deleteItem,
} = require("../controllers/clothingItems");

router.get("/", getItems);
router.post("/", createItem);
router.delete("/:itemId", (req, res, next) => {
  const { itemId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    return res.status(400).send({ message: "Invalid item ID" });
  }

  return deleteItem(req, res, next);
});

module.exports = router;
