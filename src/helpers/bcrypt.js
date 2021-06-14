const bcrypt = require('bcryptjs')
const EncryptionError = require('../errors/encryption-error')

class BcryptHelper {
    static async hash(attribute) {
        try {
            return bcrypt.hash(attribute, 8)
        } catch (e) {
            throw new EncryptionError(e)
        }
    }

    static async compare(plainAttribute, hashAttribute) {
        return bcrypt.compare(plainAttribute, hashAttribute);
    }
}

module.exports = BcryptHelper