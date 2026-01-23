const { ERROR_404 } = require("../utils/statusCodes");

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
    this.statusCode = ERROR_404;
  }
}

module.exports = NotFoundError;
