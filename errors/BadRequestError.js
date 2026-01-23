const { ERROR_400 } = require("../utils/errors");

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = "BadRequestError";
    this.statusCode = ERROR_400;
  }
}

module.exports = BadRequestError;
