const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const { PORT = 3001 } = process.env;

const auth = require("./middlewares/auth");
const { createUser, login } = require("./controllers/users");
const clothingItemsRouter = require("./routes/clothingsItems");
const usersRouter = require("./routes/users");

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

app.use(cors());
app.use(express.json());

// // Temporary authorization solution for testing
// app.use((req, res, next) => {
//   req.user = {
//     _id: "690e73961b205cacc1369140",
//   };
//   next();
// });

// Public routes (no auth required)
app.post("/signin", login);
app.post("/signup", createUser);

// Protected routes (auth required)
app.use("/users", auth, usersRouter);

// Apply auth middleware to specific item routes instead of globally
app.use("/items", clothingItemsRouter);

app.use((req, res) => {
  res.status(404).send({ message: "Requested resource not found" });
});

// Global error handler
app.use((err, req, res, _next) => {
  if (err && err.name === "CastError" && err.kind === "ObjectId") {
    return res.status(400).send({ message: "Invalid id" });
  }

  console.error(err);
  return res.status(err.statusCode || 500).send({
    message: err.message || "Internal Server Error",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
