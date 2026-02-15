const router = require("express").Router();
const { getCurrentUser, updateUser } = require("../controllers/users");
const { validateUserUpdate } = require("../middlewares/validation");

// All routes here are already protected by auth middleware in app.js
router.get("/me", getCurrentUser);
router.patch("/me", validateUserUpdate, updateUser);

module.exports = router;
