const { ERROR_400, ERROR_404, ERROR_500 } = require("../utils/errors");

// 404 handler middleware
const notFoundHandler = (req, res) => {
  res.status(ERROR_404).send({ message: "Requested resource not found" });
};

// Global error handler middleware - MUST have 4 parameters
const errorHandler = (err, req, res, next) => {
  if (err && err.name === "CastError" && err.kind === "ObjectId") {
    return res.status(ERROR_400).send({ message: "Invalid id" });
  }

  console.error(err);
  return res.status(err.statusCode || ERROR_500).send({
    message: err.message || "Internal Server Error",
  });
};

module.exports = { notFoundHandler, errorHandler };
