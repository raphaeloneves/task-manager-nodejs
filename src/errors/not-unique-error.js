const BaseError = require('./base-error')

class NotUniqueError extends BaseError {
    constructor(error, statusCode, message) {
        super(error, 422, message);
        this.error = this.defaultMessage(error)
    }

    defaultMessage (error) {
        return `Resource already in use: ${JSON.stringify(error.keyValue)}`
    }
}

module.exports = NotUniqueError