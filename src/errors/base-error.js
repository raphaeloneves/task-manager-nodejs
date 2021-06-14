class BaseError extends Error {
    constructor(error, statusCode = 500, message = undefined) {
        super(error);
        this.error = message || error.message || 'Oops! Something went wrong'
        this.statusCode = statusCode
        this.timestamp = new Date()
    }
}

module.exports = BaseError