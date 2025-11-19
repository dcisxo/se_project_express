const router = require("express").Router();
const {
  getUsers,
  getUser,
  getCurrentUser,
  updateUser,
} = require("../controllers/users");

// All routes here are already protected by auth middleware in app.js
router.get("/", getUsers);
router.get("/me", getCurrentUser);
router.get("/:userId", getUser);
router.patch("/me", updateUser);

module.exports = router;
