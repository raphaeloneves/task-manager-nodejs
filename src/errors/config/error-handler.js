const BaseError = require("../base-error");

const errorHandler = (err, req, res, next) => {
    console.log(err)
    if(err instanceof BaseError) {
        res.status(err.statusCode).send(err)
    }else {
        res.status(500).send(new BaseError(err, 500))
    }
    next(err)
}

module.exports = errorHandler