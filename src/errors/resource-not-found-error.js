const BaseError = require('./base-error')

class ResourceNotFoundError extends BaseError {
    constructor(error, statusCode, message) {
        super(error, 404, "Resource not found.");
    }
}

module.exports = ResourceNotFoundError