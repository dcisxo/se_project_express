const express = require("express");

const app = express();
const mongoose = require("mongoose");

const { PORT = 3001 } = process.env;

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

app.use(express.json());
// Temporary middleware to set a default user (remove this later when you add authentication)
app.use((req, res, next) => {
  req.user = {
    _id: "507f1f77bcf86cd799439011", // replace with a valid user ID from your database
  };
  next();
});

// Import and use routes
const clothingItemsRouter = require("./routes/clothingsItems");
const usersRouter = require("./routes/users");

app.use("/items", clothingItemsRouter);
app.use("/users", usersRouter);

app.use((req, res) => {
  res.status(404).send({ message: "Requested resource not found" });
});

// Global error handler
app.use((err, req, res) => {
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
