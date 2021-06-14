const BaseError = require('./base-error')

class ValidationError extends BaseError {
    constructor(error, statusCode, message) {
        super(error, 422, message);
    }
}

module.exports = ValidationError