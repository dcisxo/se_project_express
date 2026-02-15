const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  validateClothingItem,
  validateId,
} = require("../middlewares/validation");
const {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");

router.get("/", getItems); // Public route - no auth required

// Protected routes - auth required
router.post("/", validateClothingItem, auth, createItem);
router.put("/:itemId/likes", validateId, auth, likeItem);
router.delete("/:itemId/likes", validateId, auth, dislikeItem);
router.delete("/:itemId", validateId, auth, deleteItem);

module.exports = router;
