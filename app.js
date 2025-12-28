const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { ERROR_400, ERROR_404, ERROR_500 } = require("./utils/errors");

const app = express();
const { PORT = 3001 } = process.env;

const auth = require("./middlewares/auth");
const authRouter = require("./routes/auth");
const clothingItemsRouter = require("./routes/clothingsItems");
const usersRouter = require("./routes/users");

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

app.use(cors());
app.use(express.json());

// Public routes (no auth required)
app.use("/", authRouter);

// Items routes (some protected, some public)
app.use("/items", clothingItemsRouter);

// Protected routes (auth required)
app.use("/users", auth, usersRouter);

// 404 handler
app.use((res) => {
  res.status(ERROR_404).send({ message: "Requested resource not found" });
});

// Global error handler - MUST have 4 parameters (err, req, res, next)
app.use((err, res) => {
  if (err && err.name === "CastError" && err.kind === "ObjectId") {
    return res.status(ERROR_400).send({ message: "Invalid id" });
  }

  console.error(err);
  return res.status(err.statusCode || ERROR_500).send({
    message: err.message || "Internal Server Error",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
