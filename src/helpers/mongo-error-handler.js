const NotUniqueError = require('../errors/not-unique-error')

class MongoErrorHandler {
    static handle(mongoError) {
        return errorsCode.get(mongoError.code)
    }
}

const errorsCode = new Map([
    [11000, NotUniqueError]
]);

module.exports = MongoErrorHandler