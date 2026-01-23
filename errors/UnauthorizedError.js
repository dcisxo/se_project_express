const { ERROR__401 } = require("../utils/errors");

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = "UnauthorizedError";
    this.statusCode = ERROR__401;
  }
}

module.exports = UnauthorizedError;
