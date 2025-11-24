const router = require("express").Router();
const { getCurrentUser, updateUser } = require("../controllers/users");

// All routes here are already protected by auth middleware in app.js
router.get("/me", getCurrentUser);
router.patch("/me", updateUser);

module.exports = router;
