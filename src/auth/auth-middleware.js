const jwt = require('jsonwebtoken')
const User = require('../users/users-model')

const MY_KEY = 'node_playground_key'
const AUTH_HEADER_NAME = 'authorization'
const AUTH_TOKEN_PREFIX = 'Bearer '

const authHandler = async (req, res, next) => {
    try {
        const authHeader = req.headers[AUTH_HEADER_NAME];
        if(!authHeader) {
            throw new Error()
        }

        const token = authHeader.replace(AUTH_TOKEN_PREFIX, '')
        const decodedToken = jwt.verify(token, MY_KEY)
        const loggedUser = await User.findOne( {_id: decodedToken._id, 'tokens.token': token})

        if(!loggedUser) {
            throw new Error()
        }

        req.user = loggedUser;
        req.token = token
        next()
    } catch (e) {
        res.status(403).send({error: "Please authenticate!"})
    }
}

module.exports = authHandler