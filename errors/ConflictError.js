const { ERROR_409 } = require("../utils/errors");

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.name = "ConflictError";
    this.statusCode = ERROR_409;
  }
}

module.exports = ConflictError;
