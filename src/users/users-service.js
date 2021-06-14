const User = require('./users-model')
const ValidationError = require('../errors/validation-error')
const ResourceNotFoundError = require('../errors/resource-not-found-error')
const BcryptHelper = require('../helpers/bcrypt')
const BaseError = require("../errors/base-error");
const MongoErrorHandler = require("../helpers/mongo-error-handler");

const save = async (userRequestDto) => {
    userRequestDto.password = await BcryptHelper.hash(userRequestDto.password)
    const user  = new User(userRequestDto);
    try {
        await user.save()
        return user
    }catch (e){
        switch (e.constructor.name) {
            case 'ValidationError':
                throw new ValidationError(e)
            default:
                throw new (MongoErrorHandler.handle(e))(e)
        }
    }
}

const findById = async (userId) => {
    let user = undefined
    try {
        user = await User.findById(userId);
    }catch (e) {
        throw new BaseError(e)
    }

    if(!user) {
        throw new ResourceNotFoundError()
    }
    return user
}

module.exports = {
    save: save,
    findById: findById
}