const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { errors } = require("celebrate");

const app = express();
const { PORT = 3001 } = process.env;

const { requestLogger, errorLogger } = require("./middlewares/logger");
const errorHandler = require("./middlewares/errorHandler");
const auth = require("./middlewares/auth");
const authRouter = require("./routes/auth");
const clothingItemsRouter = require("./routes/clothingsItems");
const usersRouter = require("./routes/users");

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

app.use(cors());
app.use(express.json());

app.use(requestLogger);

// Public routes (no auth required)
app.use("/", authRouter);

// Items routes (some protected, some public)
app.use("/items", clothingItemsRouter);

// Protected routes (auth required)
app.use("/users", auth, usersRouter);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
