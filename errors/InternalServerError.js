const { ERROR_500 } = require("../utils/errors");

class InternalServerError extends Error {
  constructor(message) {
    super(message);
    this.name = "InternalServerError";
    this.statusCode = ERROR_500;
  }
}

module.exports = InternalServerError;
