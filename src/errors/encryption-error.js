const BaseError = require('./base-error')

class EncryptionError extends BaseError {
    constructor(error, statusCode, message) {
        super(error, 500, "Error while encrypting the resource");
    }
}

module.exports = EncryptionError