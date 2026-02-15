const router = require("express").Router();

const userRouter = require("./users");
const clothingItemRouter = require("./clothingItems");
const authRouter = require("./auth");
const auth = require("../middlewares/auth");
const { createUser, login } = require("../controllers/users");
const { ERROR_404 } = require("../utils/errors");
const {
  validateUserBody,
  validateAuthentication,
} = require("../middlewares/validation");

router.use("/", authRouter);

// Public routes
router.post("/signup", validateUserBody, createUser);
router.post("/signin", validateAuthentication, login);

// Public route for items
router.use("/items", clothingItemRouter);

// Authentication middleware for protected routes
router.use(auth);

// Protected routes
router.use("/users", userRouter);

router.use((req, res) => {
  res.status(ERROR_404).send({ message: "Requested resource not found" });
});

module.exports = router;
