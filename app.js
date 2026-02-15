require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { errors } = require("celebrate");

const app = express();
const { PORT = 3001 } = process.env;

const { requestLogger, errorLogger } = require("./middlewares/logger");
const { errorHandler } = require("./middlewares/errorHandler");
const routes = require("./routes");

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

app.use(cors());
app.use(express.json());

app.use(requestLogger);

// Public routes (no auth required)
app.use("/", routes);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
