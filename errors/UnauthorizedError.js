const { ERROR_401 } = require("../utils/errors");

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = "UnauthorizedError";
    this.statusCode = ERROR_401;
  }
}

module.exports = UnauthorizedError;
